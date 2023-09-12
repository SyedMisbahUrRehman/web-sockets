import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`); 
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log('Sent message to a client'); 
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket disconnected'); 
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
