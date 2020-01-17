/**
 * Created by guanyj on  1/7/20
 */
import {FilterDescriptor, FilterOperatorDescriptor, SortEvent} from "./grid.model";

export class Utils {

    // 平铺数组 -> 树形结构
    // todo
    flatToLinkList(list: Array<any>, primaryKey: string, childrenKey: string): Array<any> {
        const kvMap: any = {};
        const temp = [];
        list.forEach((item) => {
            if (item[primaryKey]) {
                kvMap[item[primaryKey]].push();
            } else {
                temp.push(item);
            }
        });
        return [];
    }

    resolveGridFilters(filters: Array<FilterDescriptor>) {
        const query: any = {};
        filters.forEach(filter => {
            if (filter.value !== null && filter.value !== "") {
                // 模糊匹配
                if (filter.operator === FilterOperatorDescriptor.contains) {
                    query[filter.field] = { $regex: new RegExp(filter.value), $options: 'ix' }
                } else if (filter.operator === FilterOperatorDescriptor.in && filter.value.length > 0) {
                    query[filter.field] = { $in: filter.value }
                } else if (filter.operator === FilterOperatorDescriptor.lessThan) {
                    query[filter.field] = { $lt: filter.value }
                } else if (filter.operator === FilterOperatorDescriptor.lessThanEqual) {
                    query[filter.field] = { $lte: filter.value }
                } else if (filter.operator === FilterOperatorDescriptor.greaterThan) {
                    query[filter.field] = { $gt: filter.value }
                } else if (filter.operator === FilterOperatorDescriptor.greaterThanEqual) {
                    query[filter.field] = { $gte: filter.value }
                } else if (filter.operator === FilterOperatorDescriptor.equal) {
                    query[filter.field] = { $eq: filter.value }
                }
            }
        });
        return query;
    }

    resolveGridSort(sort: SortEvent) {
        if (sort && sort.dir) {
            return {
                [sort.field]: (sort.dir === 'asc' ? 1 : -1)
            }
        } else {
            return { _id: 1 };
        }
    }
}

export const utils = new Utils();
