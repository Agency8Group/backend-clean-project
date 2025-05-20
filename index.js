const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// 루트 경로 응답 추가
app.get('/', (req, res) => {
  res.send('서버는 정상 작동 중입니다. /api/hello를 호출해보세요.');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: '백엔드 연결 성공!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});