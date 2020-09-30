import { Router } from 'express';
import UserController from '../controllers/user';
import * as auth from '../middleware/auth.middleware';
export default class MainRouter {

  router: Router;
  userController: typeof UserController;

  constructor() {

    // Initialize controllers objects
    this.userController = UserController;

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();

  }

  private userRoutes() {
    this.router.route('/users')
      .get(this.userController.findAll);
      // .post(this.userController.create);

    this.router.route('/users/:id')
      .get(this.userController.findById)
      .put(this.userController.update)
      .delete(this.userController.delete);
    this.router.route('/users/login').post(auth.checkToken, this.userController.login);
    this.router.route('/users/register').post(this.userController.register);
  }
}