/**
 * 连接mongodb服务
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-02-02 22:24:30
 * @LastEditTime: 2019-02-02 22:26:22
 */

import { environment } from "./environments/environment";
import {connect} from 'mongoose';

export class DbService {

    private static database: any;

    /**
     * 私有化构造函数
     */
    private constructor() { }

    /**
     * 开启数据库链接
     */
    static async getDatabase(): Promise<any> {
        if (DbService.database) {
            return DbService.database;
        }

        const client = await connect(environment.mongodbUrl, { useNewUrlParser: true });
        // DbService.database = client.db(environment.database);
        return DbService.database;
    }

}
