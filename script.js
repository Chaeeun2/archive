// 서버에 연결
const socket = io();

// 캔버스 요소와 컨텍스트 생성
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 그리기 상태 변수
let drawing = false;

// 마우스 이벤트 처리
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// 그리기 시작
function startDrawing(event) {
  drawing = true;
  draw(event);
}

// 그리기 중지
function stopDrawing() {
  drawing = false;
}

// 그리기
function draw(event) {
  if (!drawing) return;
  
  const x = event.offsetX;
  const y = event.offsetY;

  ctx.fillRect(x, y, 2, 2);

  // 서버로 그린 좌표 전송
  socket.emit('draw', { x, y });
}

// 서버에서 받은 그리기 정보 처리
socket.on('draw', function(data) {
  ctx.fillRect(data.x, data.y, 2, 2);
});