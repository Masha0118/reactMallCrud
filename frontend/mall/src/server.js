const express = require('express');
const cors = require('cors');

const app = express();

// 반드시 CORS 설정을 가장 먼저 추가
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// JSON 요청을 처리할 수 있도록 설정
app.use(express.json());

// 라우트 예시
app.get('/api/todo/list', (req, res) => {
    res.json({ message: '목록 조회 성공' });
});

app.get('/api/todo/:tno', (req, res) => {
    res.json({ message: `특정 항목 ${req.params.tno} 조회 성공` });
});

// 서버 시작
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
