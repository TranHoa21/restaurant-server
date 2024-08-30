const express = require('express');
const app = express();
import initRouter from './src/routers';
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_POSTGRE,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 59417,
    ssl: {
        rejectUnauthorized: false,
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Có lỗi khi kết nối với cơ sở dữ liệu:', err);
        return;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu!');
    release();
});

const port = process.env.PORT || 3001;

initRouter(app);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});