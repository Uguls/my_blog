const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const memorystore = require('memorystore')(session);
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const axios = require('axios');
const winston = require('winston');
const moment = require('moment-timezone');
const {swaggerUi, specs} = require("./src/swagger");
const User = require('./models/user');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');

process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';

try {
	fs.readdirSync('uploads');
} catch (error) {
	fs.mkdirSync('uploads');
}

dotenv.config();

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/post')

const {sequelize} = require('./models');
const passportConfig = require('./passport');
passportConfig();

const app = express();
app.set('port', process.env.PORT || 8080);

sequelize.sync({force: false})
	.then(() => {
		console.log('데이터베이스 연결 성공');
	})
	.catch((err) => {
		console.error(err);
	});

app.use(cors({credentials: true, origin: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 3), // 3시간
		httpOnly: true,
		secure: false,
	},
	store: new memorystore({
		checkPeriod: 43200000, // 12h
	}),
}));
app.use(passport.initialize());
app.use(passport.session());

// 라우터 설정
app.use('/auth', authRouter);
app.use('/post', postsRouter);

const server = http.createServer(app);

server.listen(app.get('port'), async () => {
console.log(app.get('port'), '번 포트에서 대기중');
});
