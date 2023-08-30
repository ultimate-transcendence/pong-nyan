import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SendMessageButton from './SendMessageButton';
import { socket } from '@/context/socket';

function ChatRoom() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [targetUserId, setTargetUserId] = useState('');

  useEffect(() => {
    socket.on('chat-private-message', (message) => {
      // 메시지를 추가합니다.
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat-private-message');
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, inputMessage]);
      socket.emit('chat-private-message', { targetUserId, message: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '700px', minWidth: '370px', backgroundColor: 'ivory'}}>
        <MessageList messages={messages} />
        <div style={{ display: 'flex', marginTop: 'auto' }}>
          <input
            type="text"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            placeholder="대상 사용자 ID"
            style={{ flexGrow: 0.5, marginRight: '10px' }}
          />
          <MessageInput value={inputMessage} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)} />
          <SendMessageButton onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;