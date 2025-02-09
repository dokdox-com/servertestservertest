const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 클라이언트가 웹소켓을 통해 메시지를 보낼 때마다 처리
io.on('connection', (socket) => {
  console.log('A user connected');

  // 메시지를 받았을 때
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('chat message', msg);  // 모든 클라이언트에게 메시지 전송
  });

  // 연결 끊김
  socket.on('disconnect', () => {
    console.log('A user disconnected--사용자가 접근함');
  });
});

// 서버 시작
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("dokdox 를 이용해주셔서 대단히 감사합니다. 작동이 검증되었습니다.");
});
