import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

// Map to store WebSocket connections by user ID
const userConnections = new Map<number, WebSocket>();

wss.on('connection', function connection(ws: WebSocket, req) {
  console.log('New client connected');

  // Extract user ID from the query parameters (e.g., ws://localhost:8080?userId=1)
  const userId = Number(new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('userId'));

  if (userId) {
    // Store the WebSocket connection with the user ID
    userConnections.set(userId, ws);
    console.log(`User ${userId} connected`);
  }

  ws.on('error', console.error);

  ws.on('message', function message(data: Buffer) {
    console.log('Received message:', data.toString());

    try {
      const messageData = JSON.parse(data.toString());

      // Broadcast the message to the intended recipient(s)
      if (messageData.type === 'private') {
        const { receiverId } = messageData;

        // Send the message to the receiver if they are connected
        if (userConnections.has(receiverId)) {
          const receiverWs = userConnections.get(receiverId);
          receiverWs?.send(JSON.stringify(messageData));
        }
      } else if (messageData.type === 'group') {
        const { groupChatId } = messageData;

        // Broadcast the message to all participants in the group chat
        // (You can fetch group participants from the Next.js backend if needed)
        userConnections.forEach((client, clientUserId) => {
          if (clientUserId !== userId) {
            client.send(JSON.stringify(messageData));
          }
        });
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove the WebSocket connection from the map
    if (userId) {
      userConnections.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  });

  ws.send('Welcome to the WebSocket server!');
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});