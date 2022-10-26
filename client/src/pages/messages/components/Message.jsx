import PROFILEPIC from '../../../assets/me.jpg';

function Message({ id, content, right }) {
  return (
    <li className="rounded-md p-2 hover:bg-gray-200 max-w-full">
      <div
        className={`w-fit max-w-md border border-gray-100 bg-gray-100 shadow-sm py-2 px-3 rounded-md z-10 ${
          right && 'ml-auto'
        }`}
      >
        <div className="flex gap-3 mb-2">
          <img src={PROFILEPIC} alt="" className="w-8 h-8 rounded-full " />
          <p>{id}</p>
        </div>
        <p className="text-gray-500">{content}</p>
      </div>
    </li>
  );
}

export default Message;
