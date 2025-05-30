const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // public 폴더에서 정적파일 제공

// POST API
app.post('/api/suggestion', (req, res) => {
    const suggestion = req.body.suggestion;
    if (!suggestion) {
        return res.status(400).json({ message: '건의 내용을 입력해주세요.' });
    }

    // 저장할 파일 경로 (예: data/suggestions.json)
    const filePath = path.join(__dirname, 'data', 'suggestions.json');

    // 디렉토리/파일이 없으면 먼저 생성
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath));
    }
    let suggestions = [];
    if (fs.existsSync(filePath)) {
        suggestions = JSON.parse(fs.readFileSync(filePath));
    }

    // 새 건의 추가
    suggestions.push({
        suggestion,
        date: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(suggestions, null, 2));
    res.json({ message: '건의가 저장되었습니다. 감사합니다!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
