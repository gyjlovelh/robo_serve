/**
 * 用户模块
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-01 23:59:51
 * @LastEditTime: 2019-02-03 21:17:16
 */
import { DbService } from '../db.service';
import { ResultUtil } from '../utils/result.util';

export class UserService {
    
    /**
     * 登录
     * 
     * @param params 
     */
    async login(params: {username: string, password: string}) {
        const db = await DbService.getDatabase();
        try {
            const target = await db.collection('user').findOne({name: params.username, password: params.password});
            if (target) {
                return ResultUtil.success(target);
            } else {
                return ResultUtil.error(-1, '用户名或密码错误');
            }
        } catch (err) {

        }
    }

    /**
     * 注册用户
     * 
     * @param user 
     */
    async register(user: any) {
        const db = await DbService.getDatabase();
        try {
            const col = db.collection('user');
            const list = await col.find().toArray();
            if (list.find(item => item.code === user.code)) {
                return ResultUtil.error(-1, 'code 重复');
            } else if (list.find(item => item.name === user.name)) {
                return ResultUtil.error(-1, 'name 重复');
            } else if (list.find(item => item.email === user.email)) {
                return ResultUtil.error(-1, 'email 重复');
            } else {
                await col.insert(user);
                return ResultUtil.success();
            }
            
        } catch (err) {

        }
    }

}
