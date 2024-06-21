import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {postRouter} from "./routers/post.router";
import {userRouter} from "./routers/user.router";

const app = express();

app.use(cors({
	origin: 'http://localhost:3000',
}));

app.use(json());

app.use(rateLimit({
	windowMs: 5 * 60 * 1000, //5 minutes
	max: 1000, //limit each IP to 100 requests per 'window' (here, per 5 mins)
}))

app.use('/post', postRouter);
app.use('/user', userRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
	console.log('listenin on http://localhost:3001');
})
