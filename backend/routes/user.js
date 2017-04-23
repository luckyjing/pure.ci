import Router from 'koa-router';
import * as UserController from '../controller/userController';
const router = new Router();


router.get('/check/email', UserController.checkEmail);
router.post('/', UserController.register);
router.get('/', UserController.getUserInfo)

export default router;