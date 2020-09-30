import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import UserManager from '../managers/users';
import logger from '../lib/logger';

const name = 'UserController';

class UserController {
    constructor() {}

    async findAll(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.findAll(req, {});
        logger.info(req, `${name} - Successfully found all`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error finding by all. `, err);
        next(err);
      }      
    }

    async findById(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.findById(req, Number(req.params.id), {});
        logger.info(req, `${name} - Successfully found by id: ${req.params.id}`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error finding by id: ${req.params.id}. `, err);
        next(err);
      }
    }

    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.create(req, req.body, {});
        logger.info(req, `${name} - Successfully created with body: `);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error creating with body: . `, err);
        next(err);
      }
    }

    async update(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.update(req, Number(req.params.id), req.body, {});
        logger.info(req, `${name} - Successfully updated by id: ${req.params.id}`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error updating with id: ${req.params.id}. `, err);
        next(err);
      }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.delete(req, Number(req.params.id), {});
        logger.info(req, `${name} - Successfully deleted by id: ${req.params.id}`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error deleting with id: ${req.params.id}. `, err);
        next(err);
      }
    }

    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const { email, password } = req.body;
        const data = await UserManager.login(req, email, password, {});
        logger.info(req, `${name} - Successfully logged in User with email: ${email}`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error logging in User with email: ${req.body.email}. `, err);
        next(err);
      }
    }

    async register(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await UserManager.register(req, req.body, {});
        logger.info(req, `${name} - Successfully registered User: ${JSON.stringify(req.body || {})}`);
        res.json(data);
      } catch (err) {
        logger.error(req, `${name} - Error registering User: ${JSON.stringify(req.body || {})}. `, err);
        next(err);
      }
    }

}

export = new UserController();