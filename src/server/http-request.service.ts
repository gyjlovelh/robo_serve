/**
 * Created by guanyj on  1/10/20
 */
import {CommonCurdService} from "./common-curd.service";
import {HttpRequestModel} from "../models/http-request.model";


export class HttpRequestService extends CommonCurdService {

    constructor() {
        super(HttpRequestModel);
    }
}
