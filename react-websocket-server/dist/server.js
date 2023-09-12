"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`); // Log received messages
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(message);
                console.log('Sent message to a client'); // Log when a message is sent to a client
            }
        });
    });
    ws.on('close', () => {
        console.log('WebSocket disconnected'); // Log when a WebSocket connection is closed
    });
});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
