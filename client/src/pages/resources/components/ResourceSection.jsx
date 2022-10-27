import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as UNSTARRED } from '../../../assets/icons/bx-star.svg';
import { ReactComponent as STARRED } from '../../../assets/icons/bxs-star.svg';

import client from '../../../client';

const ResourceSection = ({ resource, title, path, create, name }) => {
  const navigate = useNavigate();
  const { courseName } = useParams();
  const formattedCourseName = courseName.replaceAll('-', ' ');

  const handleCreate = async () => {
    try {
      const res = await client.post(`/${path}`, {
        courseName: formattedCourseName,
      });
      const key = path.slice(0, path.length - 1);
      const data = res.data[key];

      navigate(`./${path}/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStar = async (e, isStarred) => {
    e.stopPropagation();

    if (isStarred) {
      //
    } else {
      //
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-10">{title}</h2>
      <div className="flex gap-4 justify-center flex-wrap sm:justify-start">
        {resource?.map(item => (
          <div
            className=" relative bg-gray-200 h-32 w-48 p-3 rounded-md flex-shrink-0 cursor-pointer group overflow-hidden hover:bg-gray-300"
            tabIndex={0}
            key={item.id}
            onClick={() => navigate(`./${path}/${item.id}`)}
          >
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="absolute bottom-2 text-sm text-gray-600 w-36">
              {name &&
                `${item.user.profile.firstName} ${item.user.profile.lastName}`}
            </p>
            {item.isStarred ? (
              <STARRED
                className="absolute bottom-2 right-2 fill-yellow-400 ml-auto hover:scale-110 translate-x-10 group-hover:-translate-x-0 transition-transform"
                onClick={e => handleStar(e, true)}
              />
            ) : (
              <UNSTARRED
                className="absolute bottom-2 right-2 w-5 h-5 ml-auto hover:scale-110 translate-x-10 group-hover:-translate-x-0 transition-transform"
                onClick={e => handleStar(e, false)}
              />
            )}
          </div>
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
