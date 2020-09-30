import { User, UserInterface } from '../models/user';
import { BaseService } from './base.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';
import error from '../lib/error';

class UserManager extends BaseService {
  constructor() {
    super('User', User);
  }

  async register(req: Request, user: UserInterface, options: any = {}) {
    try {
      const exists = await this.findOne(req, { email: user.email }, {});
      if (exists) {
        throw error('ALREADY_REGISTERED');
      }

      if (user.password !== user.confirmedPassword) {
        throw error('PASSWORDS_DONT_MATCH');
      }
      user.password = this.cryptPassword(user.password);

      const data = await this.create(req, user, {});
      logger.info(req, `User Service - Successfully registered user: ${JSON.stringify(user || {})} `);
      return data;
    } catch (err) {
      logger.error(req, `User Service - Error registering user: ${JSON.stringify(user || {})}. `, err);
      throw err;
    }
  }

  async login(req: Request, email: string, password: string, options: any = {}) {
    try {
      const exists = await this.findOne(req, { email }, {});
      if (!exists) {
        throw error('INVALID_EMAIL_PASSWORD');
      }

      const validPassword = this.validatePassword(password, exists.getDataValue('password'));
      if (!validPassword) {
        throw error('INVALID_EMAIL_PASSWORD');
      }

      const { token, refreshToken } = this.generateTokens(req, exists);
      const data = { token, refreshToken, user: exists };
      logger.info(req, `User Service - Successfully logged in User with email: ${email} `);
      return data;
    } catch (err) {
      logger.error(req, `User Service - Error logging in user with email: ${email}. `, err);
      throw err;
    }
  }

  private cryptPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  private validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  };

  private generateTokens(req: Request, user: any) {
    const token = jwt.sign({
      email: user.email,
      id: user.id
    }, process.env.TOKEN_SECRET || 'tokenSecret', {
      expiresIn: 86400 // expires in 24 hours/
    });
    const refreshToken = jwt.sign({
      user: user
    }, process.env.REFRESH_TOKEN_SECRET || 'refreshTokenSecret', {
      expiresIn: 2592000 // expires in 30 days
    });

    // _saveTokens(req, token, refreshToken, id);

    return { token, refreshToken };
  };
}

export = new UserManager();