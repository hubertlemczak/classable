import { useEffect } from 'react';
import { useState } from 'react';
import Message from './Message';
import MessageBox from './MessageBox';

const ChatRoom = () => {
  const [chat] = useState({
    messages: [
      { content: 'hi1', id: 'asdfasdf' },
      { content: 'hi2', id: 'asdfasasddf', right: true },
      { content: 'hi3', id: 'asdfaasdfasdf' },
      { content: 'hi4', id: 'asdfasw3dasdf', right: true },
      { content: 'hi5', id: 'asdfasderasdf' },
      { content: 'hi1', id: 'asdfas2df' },
      { content: 'hi2', id: 'asdfasa3sddf', right: true },
      { content: 'hi3', id: 'asdfaas4dfasdf' },
      { content: 'hi4', id: 'asdfasw53dasdf', right: true },
      { content: 'hi5', id: 'asdfasde6rasdf' },
      { content: 'hi1', id: 'asdfas12df' },
      { content: 'hi2', id: 'asdfasa3s2ddf', right: true },
      { content: 'hi3', id: 'asdfaas4df3asdf' },
      { content: 'hi4', id: 'asdfasw534dasdf', right: true },
      { content: 'hi5', id: 'asdfasde56rasdf' },
      { content: 'hi1', id: 'asdfa1s12df' },
      { content: 'hi2', id: 'asdfas2a3s2ddf', right: true },
      { content: 'hi3', id: 'asdfaa3s4df3asdf' },
      {
        content:
          'hi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfffhi4asdfff',
        id: 'asdfasw4534dasdf',
        right: true,
      },
      { content: 'hi5', id: 'asdfasde556rasdf' },
    ],
  });

  useEffect(() => {
    //
  }, []);

  return (
    <div className="flex flex-col justify-end h-full">
      <ul
        className="overflow-y-scroll no-scrollbar overflow-x-hidden"
        style={{ maxHeight: 'calc(100vh - 260px)' }}
      >
        {chat?.messages?.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </ul>
      <MessageBox />
    </div>
  );
};

export default ChatRoom;
