import express, {Request, Response, Router} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {UserRecord} from '../records/user.record';
import {UserAuth} from '../controllers/authentication/authentication';

export const userRouter = Router();

const app = express();

app.use(cookieParser());
app.use(
    session({
        secret: '1234',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}, // Set to true if using HTTPS
    })
);
app.use(express.json());
userRouter.post('/signup', async (req, res) => {
    const user = new UserRecord(req.body);
    await user.insert();
    res.json(user);
});

userRouter.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await UserRecord.findByEmail(email);

    if (!user || !UserAuth.validatePassword(password, user.salt, user.password)) {
        console.log('Invalid email or password');
        return res.status(401).json({message: 'Invalid email or password'});
    }
    console.log('User authenticated');
});