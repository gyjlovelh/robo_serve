/**
 * {{desc}}
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-02 22:24:31
 * @LastEditTime: 2019-02-03 12:23:16
 */
import * as Router from 'koa-router';
import {i18nRouter} from "./i18n.route";
import {moduleRouter} from "./module.route";
import {pageRouter} from "./page.route";
import {layoutRouter} from "./layout.route";

const router = new Router();

router.use('/orchid_flavor/i18n', i18nRouter.routes(), i18nRouter.allowedMethods());
router.use('/orchid_flavor/module', moduleRouter.routes(), moduleRouter.allowedMethods());
router.use('/orchid_flavor/page', pageRouter.routes(), pageRouter.allowedMethods());
router.use('/orchid_flavor/layout', layoutRouter.routes(), layoutRouter.allowedMethods());


export const api = router;
