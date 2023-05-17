const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// 정적 파일 서비스
app.use(express.static(__dirname));

// 클라이언트 연결
io.on('connection', function(socket) {
  console.log('새로운 사용자가 연결되었습니다.');

  // 그린 좌표 전송
  socket.on('draw', function(data) {
    // 다른 클라이언트에 그린 좌표 전송
    socket.broadcast.emit('draw', data);
  });

  // 클라이언트 연결 해제
  socket.on('disconnect', function() {
    console.log('사용자가 연결을 해제했습니다.');
  });
});

// 서버 시작
const port = 3000;
server.listen(port, function() {
  console.log('서버가 http://localhost:' + port + '에서 실행 중입니다.');
});