
export class ResultUtil {
    /**
     * 成功信息
     *
     * @param data
     */
    static success<T = any>(data: any = []) {
        const modal = new ResponseResult<T>();
        modal.data = data;
        modal.code = 200;
        modal.msg = '操作成功~';
        return modal;
    }

    static error(code: number = -1, msg: string = "") {
        const modal = new ResponseResult();
        modal.code = code;
        modal.data = null;
        modal.msg = msg;
        return modal;
    }

    static result(code: number, msg: string, data: any) {
        const modal = new ResponseResult();
        modal.code = 200;
        modal.data = data;
        modal.msg = msg;
        return modal;
    }
}


export class Result {
    code: number;
    msg: string;
    data: any;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

export class ResponseResult<T = any> {

    code: number;

    /**
     * 返回数据
     */
    data: T;

    /**
     * 错误消息
     */
    msg: string = '';
}


export class TableResult<T> {

    /**
     * 分页尺寸
     */
    pageSize: number;

    /**
     * 当前页码
     */
    pageNum: number;

    /**
     * 总条数
     */
    totalCount: number;

    /**
     * 表格数据
     * @deprecated
     */
    data: T[];

    /**
     * 表格数据
     */
    records: T[];
}

