import { Message } from "./message.util";


export class ResultUtil {
    /**
     * 成功信息
     * 
     * @param data 
     */
    static success<T = any>(data: any = []) {
        const modal = new ResponseResult<T>();
        modal.success = true;
        modal.data = data;
        return modal;
    }

    static error(code: number = -1, msg: string = "") {
        const modal = new ResponseResult();
        modal.success = false;
        modal.errorCode = code;
        modal.errorMsg = msg;
        return modal;
    }

    static result(code: number, msg: string, data: any) {
        const modal = new ResponseResult();
        modal.success = true;
        modal.errorCode = code;
        modal.errorMsg = msg;
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

    /**
     * 返回数据
     */
    data: T;

    /**
     * 错误码
     */
    errorCode: string | number = '';

    /**
     * 错误等级
     */
    errorLevel: string = '';

    /**
     * 错误消息
     */
    errorMsg: string = '';

    /**
     * 操作是否成功
     */
    success: boolean = false;
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
     */
    data: T[];
}

