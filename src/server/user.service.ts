/**
 * Created by guanyj on  1/16/20
 */
import {UserModel} from "../models/user.model";
import {ResultUtil} from "../utils/result.util";


export class UserService {

    async register(params: any) {
        await UserModel.create(params);

        return ResultUtil.success();
    }

    async login(ctx: any) {
        const {account, password} = ctx.request.body;
        const userDoc = await UserModel.findOne({account: account, password: password});

        if (userDoc._id) {
            ctx.cookies.set('user', userDoc._id);
            ctx.append('user', userDoc._id);

            return ResultUtil.success(userDoc);
        } else {
            return ResultUtil.error(500, '账号密码错误');
        }
    }
}
