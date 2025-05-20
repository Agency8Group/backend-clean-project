const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// 📌 정적 파일 폴더 등록
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트 (생략해도 자동으로 index.html 표시됨)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});