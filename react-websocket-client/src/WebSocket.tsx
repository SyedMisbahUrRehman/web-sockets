import React, { useState, useEffect } from 'react';

const WebSocketChat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:8080');
    
    newWs.onopen = () => {
      console.log('WebSocket connection opened');
    };
    
    newWs.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    
    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    // newWs.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && inputMessage) {
      console.log(`Sending message to server: ${inputMessage}`); // Log the message before sending
      ws.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <div>
        <h1>WebSocket Chat</h1>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default WebSocketChat;
