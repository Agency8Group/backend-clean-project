// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: '백엔드 연결 성공!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});