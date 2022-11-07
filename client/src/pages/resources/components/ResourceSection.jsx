import { useNavigate } from 'react-router-dom';

import { ReactComponent as UNSTARRED } from '../../../assets/icons/bx-star.svg';
import { ReactComponent as STARRED } from '../../../assets/icons/bxs-star.svg';

import client from '../../../client';
import { formatCourseName } from '../../../utils/formatCourseName';
import ResourceItem from './ResourceItem';

const ResourceSection = ({ resource, title, path, create, name }) => {
  const navigate = useNavigate();

  const courseName = formatCourseName();

  const handleCreate = async () => {
    try {
      const res = await client.post(`/${path}`, {
        courseName,
      });
      const key = path.slice(0, path.length - 1);
      const data = res.data[key];

      navigate(`./${path}/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-10">{title}</h2>
      <div className="flex gap-4 justify-center flex-wrap sm:justify-start">
        {resource?.map(item => (
          <ResourceItem
            key={item.id}
            {...{
              id: item.id,
              isStarred: item.isStarred,
              firstName: item.user.profile.firstName,
              lastName: item.user.profile.lastName,
              path,
              title: item.title,
            }}
          />
        ))}
        {create && (
          <button
            className="bg-gray-200 h-32 w-48 p-3 rounded-md flex-shrink-0 font-bold hover:bg-gray-300"
            onClick={handleCreate}
          >
            Create {create}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceSection;
