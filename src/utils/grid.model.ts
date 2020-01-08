/**
 * Created by guanyj on  1/7/20
 */

export class GridChangeEvent {

    /**
     * 特殊条件
     */
    [key: string]: any;

    /** 非表格内部条件，或者不易处理条件 */
    extras?: any;

    /**
     * 表格内部支持的过滤条件
     */
    filters: FilterDescriptor[] = [];

    /**
     * 排序条件
     */
    sort: SortEvent;

    /**
     * 分页条件
     */
    pager: PagerDescriptor = new PagerDescriptor();

}


export class SortEvent {

    /** 排序字段 */
    field: string;

    /** 排序规则 */
    dir: 'asc' | 'desc' = null;
}


/**
 * 过滤条件描述器
 */
export class FilterDescriptor {

    /**
     * 过滤字段
     */
    field: string;

    /**
     * 过滤值
     */
    value: any;

    /**
     * 操作符
     */
    operator: FilterOperatorDescriptor;

}


export enum FilterOperatorDescriptor {

    /**
     * 模糊查询
     */
    contains = 'contains',

    /**
     * 全等
     */
    equal = 'eq',

    /**
     * 不等
     */
    notEqual = 'neq',

    /**
     * 包含
     */
        in = 'in',

    /**
     * 小于
     */
    lessThan = 'lt',

    /**
     * 小于等于
     */
    lessThanEqual = 'lte',

    /**
     * 大于
     */
    greaterThan = 'gt',

    /**
     * 大于等于
     */
    greaterThanEqual = 'gte'
}



export class PagerDescriptor {

    /**
     * 当前页
     * @type {number}
     */
    pageNo = 1;

    /**
     * 分页尺寸
     */
    pageSize = 20;

}
