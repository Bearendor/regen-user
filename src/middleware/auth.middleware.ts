import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import error from '../lib/error';
import { User, UserInterface } from '../models/user';

const checkUser = (userId: number): Promise<any> => {
  return new Promise(async (resolve) => {
    const user = await User.findByPk(userId);
    resolve(user);
  });
};

const checkToken = (token: string, req: Request, res: Response, next: NextFunction) => {
  jwt.verify(token, process.env.TOKEN_SECRET || 'tokenSecret', (err, decoded: any) => {
    if (err) {
      if (err.message === 'jwt expired') {
        return next(error('EXPIRED'));
      } else {
        return next(error('FORBIDDEN'));
      }
    }
    if (!decoded || !decoded.id) {
      return next(error('FORBIDDEN'));
    }
    checkUser(decoded.id).then(user => {
      if (!user) return next(error('NOT_FOUND', 'User'));
      if (user.email !== decoded.email) return next(error('FORBIDDEN'));

      req.user = user;
      next();
    }, err => {
      next(err);
    });
  });
}

export {
  checkToken
}