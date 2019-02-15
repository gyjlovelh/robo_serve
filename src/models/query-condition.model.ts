

export class QueryCondition {

    /** 过滤条件（and） */
    filters: any;

    /** 排序字段（单排序） */
    sort: any = { _id: 1 };

    /** 分页尺寸 */
    pagesize: number;

    /** 当前页码 */
    current: number;

    [key: string]: any;

    get skip(): number {
        return (this.current - 1) * this.pagesize;
    }

    get limit(): number {
        return this.pagesize;
    }

    constructor(condition: any) {
        Object.keys(condition).forEach(key => {
            // 解析排序条件
            if (key === 'sort') {
                if (condition.sort && condition.sort.sortValue) {
                    this.sort = {
                        [condition.sort.sortField]: (condition.sort.sortValue === 'asc' ? 1 : -1)
                    }
                } else {
                    this.sort = { _id: 1 };
                }
            } else if (key === 'filters') {
                // 解析过滤条件
                const query: any = {};
                condition[key].forEach((filter: any) => {
                    if (filter.value) {
                        // 模糊匹配
                        if (filter.operator === FilterOperatorDescriptor.contains) {
                            query[filter.field] = { $regex: new RegExp(filter.value), $options: 'ix' }
                        }
                        if (filter.operator === FilterOperatorDescriptor.in && filter.value.length > 0) {
                            query[filter.field] = { $in: filter.value }
                        }
                        if (filter.operator === FilterOperatorDescriptor.lessThan) {
                            query[filter.field] = { $lt: filter.value }
                        }
                        if (filter.operator === FilterOperatorDescriptor.lessThanEqual) {
                            query[filter.field] = { $lte: filter.value }
                        }
                        if (filter.operator === FilterOperatorDescriptor.greaterThan) {
                            query[filter.field] = { $gt: filter.value }
                        }
                        if (filter.operator === FilterOperatorDescriptor.greaterThanEqual) {
                            query[filter.field] = { $gte: filter.value }
                        }
                        if (filter.operator === FilterOperatorDescriptor.equal) {
                            query[filter.field] = { $eq: filter.value }
                        }
                    }

                });

                this.filters = query;
            } else {
                this[key] = condition[key];
            }
        });
    }
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
