import { Message } from "./message.util";


export class ResultUtil {
    static success(data: any = []) {
        return new Result(0, '', data);
    }

    static error(code: number = -1, msg: string = "") {
        return new Result(code, msg || new Message(code).msg, "");
    }

    static result(code: number, msg: string, data: any) {
        return new Result(code,  msg || new Message(code).msg, data);
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

