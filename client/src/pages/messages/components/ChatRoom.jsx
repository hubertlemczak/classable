import { useEffect } from 'react';
import { useState } from 'react';

const ChatRoom = () => {
  const [chat] = useState({
    messages: [
      { content: 'hi1', id: 'asdfasdf' },
      { content: 'hi2', id: 'asdfasasddf', right: true },
      { content: 'hi3', id: 'asdfaasdfasdf' },
      { content: 'hi4', id: 'asdfasw3dasdf', right: true },
      { content: 'hi5', id: 'asdfasderasdf' },
    ],
  });

  useEffect(() => {
    //
  }, []);

  return (
    <div className="relative h-full">
      <div className="absolute bottom-0 w-full mt-auto ">
        <ul>
          {chat?.messages?.map(message => (
            <li
              className="border border-black w-max py-2 px-3 rounded-md"
              key={message.id}
            >
              {message.content}
            </li>
          ))}
        </ul>
        <textarea
          className="w-full p-4 min-h-max resize-none bg-gray-200 rounded-xl"
          name="chatInput"
          id=""
          cols="30"
          rows="1"
          placeholder="Message"
        ></textarea>
      </div>
    </div>
  );
};

export default ChatRoom;
