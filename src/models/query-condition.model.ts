

export class QueryCondition {

    /** 过滤条件（and） */
    filters: any;

    /** 排序字段（单排序） */
    sort: any = {_id: 1};

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
                    this.sort = {_id: 1};
                }
            } else if (key === 'filters') {
                // 解析过滤条件
                const query: any = {};
                condition[key].forEach((filter: any) => {
                    // 模糊匹配
                    if (filter.operator === 'contains' && filter.value) {
                        query[filter.field] = {$regex: new RegExp(filter.value), $options: 'ix'}
                    }
                });

                this.filters = query;
            } else {
                this[key] = condition[key];
            }
        }); 
    }
}
