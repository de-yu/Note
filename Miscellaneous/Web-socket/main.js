import express from 'express';
import { WebSocketServer } from 'ws';

// Create an Express app
const app = express();
const port = 3000;
let sum = 0
// Serve static files (if any) or HTML files
app.use(express.static('public'));

// Create an HTTP server using the Express app
const server = app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send a message to the client when they connect
  ws.send('Welcome to the WebSocket server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    sum++;
    console.log('Received: ' + message);
    // Echo the message back to the client
    ws.send('Echo: ' + message + ' ' + sum);
    
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});