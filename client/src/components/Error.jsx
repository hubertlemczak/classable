import { ReactComponent as ERRORSVG } from '../assets/icons/error.svg';

const Error = ({ message, className }) => {
  return (
    <div
      className={`flex items-start gap-3 p-2 border border-gray-300 rounded-md text-base w-52 ${className}`}
    >
      <ERRORSVG className="fill-red-600" />
      {message}
    </div>
  );
};

export default Error;
