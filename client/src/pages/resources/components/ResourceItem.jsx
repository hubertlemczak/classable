import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UNSTARRED } from '../../../assets/icons/bx-star.svg';
import { ReactComponent as STARRED } from '../../../assets/icons/bxs-star.svg';

const ResourceItem = ({
  id,
  isStarred,
  firstName,
  lastName,
  path,
  title,
  name,
}) => {
  const [starred, setStarred] = useState(isStarred);
  const navigate = useNavigate();

  const handleStar = async e => {
    e.stopPropagation();
    setStarred(prev => !prev);
  };

  return (
    <div
      className=" relative bg-gray-200 h-32 w-48 p-3 rounded-md flex-shrink-0 cursor-pointer group overflow-hidden hover:bg-gray-300"
      tabIndex={0}
      key={id}
      onClick={() => navigate(`./${path}/${id}`)}
    >
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="absolute bottom-2 text-sm text-gray-600 w-36">
        {name && `${firstName} ${lastName}`}
      </p>
      {starred ? (
        <STARRED
          className="absolute bottom-2 right-2 w-5 h-5 ml-auto fill-yellow-300 stroke-black hover:scale-110 active:scale-125 translate-x-10 group-hover:-translate-x-0 transition-transform"
          onClick={e => handleStar(e)}
        />
      ) : (
        <UNSTARRED
          className="absolute bottom-2 right-2 w-5 h-5 ml-auto hover:scale-110 active:scale-125 translate-x-10 group-hover:-translate-x-0 transition-transform"
          onClick={e => handleStar(e)}
        />
      )}
    </div>
  );
};

export default ResourceItem;
