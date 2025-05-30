const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // 정적 파일 서빙

// POST API
app.post('/api/suggestion', async (req, res) => {
    const suggestion = req.body.suggestion;
    if (!suggestion) {
        return res.status(400).json({ message: '건의 내용을 입력해주세요.' });
    }

    const filePath = path.join(__dirname, 'data', 'suggestions.json');
    const dirPath = path.dirname(filePath);

    try {
        await fs.mkdir(dirPath, { recursive: true });
        let suggestions = [];

        try {
            const data = await fs.readFile(filePath, 'utf8');
            suggestions = JSON.parse(data);
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        suggestions.push({
            suggestion,
            date: new Date().toISOString()
        });

        await fs.writeFile(filePath, JSON.stringify(suggestions, null, 2));
        res.json({ message: '건의가 저장되었습니다. 감사합니다!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
