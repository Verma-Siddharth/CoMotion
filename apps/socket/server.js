const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

const driverLocations = new Map(); // driverId → { lat, lng }

io.on('connection', (socket) => {
  console.log('✅ Socket connected:', socket.id);

  socket.on('driver:location', ({ driverId, rideId, lat, lng }) => {
    // Update driver's location in memory
    driverLocations.set(driverId, { lat, lng });

    // Broadcast to all users tracking this ride
    io.emit(`ride-location:${rideId}`, { lat, lng });
  });

  socket.on('approve:join', ({ userId, rideId }) => {
    io.emit(`join-approved:${userId}`, { rideId });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.post('/emit-approval', (req, res) => {
  const { userId, rideId } = req.body;
  io.emit(`join-approved:${userId}`, { rideId });
  res.send({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
