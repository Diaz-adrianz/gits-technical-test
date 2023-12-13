import express from 'express';
import cookieParser from 'cookie-parser';
import auth_router from './core/auth/router.js';
import author_router from './core/author/router.js';
import publisher_router from './core/publisher/router.js';
import book_router from './core/book/router.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', auth_router);
app.use('/author', author_router);
app.use('/publisher', publisher_router);
app.use('/book', book_router);

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
