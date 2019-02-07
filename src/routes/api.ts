/**
 * {{desc}} 
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-02 22:24:31
 * @LastEditTime: 2019-02-03 12:23:16
 */
import * as Router from 'koa-router';
import {documentRouter} from './document.route';
import {collectionRouter} from './collection.route';
import {userRouter} from './user.route';

const router = new Router();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/document', documentRouter.routes(), documentRouter.allowedMethods());
router.use('/collection', collectionRouter.routes(), collectionRouter.allowedMethods());

export const api = router;