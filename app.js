
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // HTTP 서버와 Socket.IO 서버를 합침
const io = socketIo(server); // Socket.IO 서버 연결

const port = 3000;

app.use(express.static('public')); // 클라이언트 파일을 제공할 public 폴더 설정

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
  console.log("dokdox 를 이용해주셔서 대단히 감사합니다.작동이 검증되었습니다.")
});
