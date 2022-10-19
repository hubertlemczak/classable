import { useNavigate } from 'react-router-dom';

const ResourceSection = ({ resource, title, path, create }) => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    //
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex">
        {resource?.map(item => (
          <div key={item.id} onClick={() => navigate(`./${path}/${item.id}`)}>
            {item.title}
          </div>
        ))}
        {create && <button onClick={handleCreate}>Create {create}</button>}
      </div>
    </div>
  );
};

export default ResourceSection;
