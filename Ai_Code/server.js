const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 启用CORS
app.use(cors());
app.use(express.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 将根目录下的文件移动到public目录
app.use(express.static(path.join(__dirname, '.')));

// API配置
const API_CONFIG = {
    BASE_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    API_KEY: '8a204ee465034c6b983f0b80452dac36.OODwAndKz9h4N0UZ',
    MODEL: 'glm-4',
    TOKEN_EXPIRATION: 60 * 60 * 1000 // 1小时过期
};

// 生成JWT token
function generateToken() {
    try {
        const [id, secret] = API_CONFIG.API_KEY.split('.');
        const timestamp = Date.now();
        const payload = {
            api_key: id,
            exp: timestamp + API_CONFIG.TOKEN_EXPIRATION,
            timestamp: timestamp
        };
        return jwt.sign(payload, secret, { algorithm: 'HS256' });
    } catch (error) {
        console.error('生成token失败:', error);
        throw error;
    }
}

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
    try {
        const token = generateToken();
        const response = await axios.post(API_CONFIG.BASE_URL, {
            model: API_CONFIG.MODEL,
            messages: req.body.messages
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('API请求失败:', error);
        res.status(500).json({ error: 'API请求失败' });
    }
});

// 处理所有其他路由
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 