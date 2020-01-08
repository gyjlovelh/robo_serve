/**
 * Created by guanyj on  1/8/20
 */
import {GridChangeEvent} from "../utils/grid.model";


export interface CommonCurdInterface<T = any> {

    queryPagingList(params: GridChangeEvent): Promise<any>;

    getFullList(): Promise<any>;

    findItemById(id: any): Promise<any>;

    addItem(model: any): Promise<any>;

    updateItem(model: any): Promise<any>;

    deleteItemById(id: any): Promise<any>;
}
