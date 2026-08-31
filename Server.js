const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Live state
let liveState = {
  isLive: false,
  hostId: null,
  viewers: 0,
  likes: 42300,
  giftGoal: { current: 5200, target: 10000 },
  topGifters: [],
  viewerList: []
};

let giftValues = { rose: 1, tiktok: 1, heartme: 5, sportscar: 50, universe: 500 };

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // New viewer joins
  liveState.viewers++;
  const username = `User${Math.floor(Math.random()*9000)+1000}`;
  liveState.viewerList.push({ id: socket.id, username, avatar: username[0] });
  
  socket.data.username = username;
  
  // Send current state to new user
  socket.emit('live_state', liveState);
  
  // Notify others
  socket.broadcast.emit('user_joined', { username, viewers: liveState.viewers });
  io.emit('viewer_count', liveState.viewers);

  // Host starts live
  socket.on('host_start', () => {
    liveState.isLive = true;
    liveState.hostId = socket.id;
    io.emit('live_started', { hostId: socket.id });
  });

  socket.on('host_stop', () => {
    liveState.isLive = false;
    io.emit('live_ended');
  });

  // Chat message
  socket.on('chat_message', (msg) => {
    const chat = {
      id: Date.now(),
      username: socket.data.username,
      text: msg.text,
      type: 'chat',
      timestamp: new Date().toISOString()
    };
    io.emit('chat_message', chat);
  });

  // Like / heart
  socket.on('send_like', (data) => {
    liveState.likes += data.count || 1;
    io.emit('like_update', { 
      likes: liveState.likes, 
      username: socket.data.username,
      count: data.count || 1,
      x: data.x, y: data.y // for heart position
    });
  });

  // Gift
  socket.on('send_gift', (data) => {
    const value = (giftValues[data.giftId] || 1) * (data.quantity || 1);
    liveState.giftGoal.current += value;
    
    // Update top gifters
    let gifter = liveState.topGifters.find(g => g.username === socket.data.username);
    if (gifter) gifter.total += value;
    else liveState.topGifters.push({ username: socket.data.username, total: value, avatar: socket.data.username[0] });
    liveState.topGifters.sort((a,b) => b.total - a.total);
    liveState.topGifters = liveState.topGifters.slice(0, 5);

    const giftEvent = {
      id: Date.now(),
      username: socket.data.username,
      giftId: data.giftId,
      giftName: data.giftName,
      quantity: data.quantity,
      value,
      type: 'gift'
    };

    io.emit('gift_received', giftEvent);
    io.emit('goal_update', liveState.giftGoal);
    io.emit('top_gifters', liveState.topGifters);

    // Goal reached celebration
    if (liveState.giftGoal.current >= liveState.giftGoal.target) {
      io.emit('goal_reached');
      liveState.giftGoal.current = 0; // reset
    }
  });

  // Typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('user_typing', { username: socket.data.username });
  });

  socket.on('disconnect', () => {
    liveState.viewers = Math.max(0, liveState.viewers - 1);
    liveState.viewerList = liveState.viewerList.filter(v => v.id !== socket.id);
    if (liveState.hostId === socket.id) {
      liveState.isLive = false;
      io.emit('live_ended');
    }
    io.emit('viewer_count', liveState.viewers);
    io.emit('user_left', { username: socket.data.username, viewers: liveState.viewers });
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.json({ status: 'TikTok Live Clone Backend Running', viewers: liveState.viewers, isLive: liveState.isLive });
});

app.get('/stats', (req, res) => {
  res.json(liveState);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 TikTok Live Backend running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket ready for connections`);
});
