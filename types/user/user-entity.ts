export interface UserEntity {
    id: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    salt: string;
}

declare module 'express-session' {
    interface SessionData {
        user: {
            id: string;
            email: string;
        };
    }
}
