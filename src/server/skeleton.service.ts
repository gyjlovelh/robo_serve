/**
 * Created by guanyj on  1/9/20
 */


import {SkeletonUtil} from "../skeleton/skeleton-util";
import {ResultUtil} from "../utils/result.util";
import {PageModel} from '../models/page.model';
import {LayoutModel} from '../models/layout.model';
import {HttpRequestModel} from "../models/http-request.model";
import {ModuleModel} from "../models/module.model";

export class SkeletonService {

    util: SkeletonUtil;

    constructor() {
        this.util = new SkeletonUtil();
    }

    async generateLayoutCode(pageId: any) {
        const layoutModel: any = await LayoutModel.findOne({page: pageId});
        if (!layoutModel) {
            return ResultUtil.error(500, '请布局后再预览~');
        }

        let pageModel: any = await PageModel.findOne({_id: pageId}).populate('module');
        if (!pageModel) {
            return ResultUtil.error(500, '页面不存在~');
        }

        // pageModel
        const pageTemplate = await this.util.resolveFramework('template-simple-grid', pageModel.toJSON({getters: true}), layoutModel.toJSON({getters: true}));
        let content = layoutModel.toJSON({getters: true}).content;
        content = JSON.parse(content);
        if (content.curdForm && content.curdForm.length > 0) {
           const curdFormTemplate = await this.util.resolveFramework('template-simple-grid-curd', pageModel.toJSON({getters: true}), layoutModel.toJSON({getters: true}));
            pageTemplate.push({
                isFile: false,
                dictName: pageModel.toJSON({getters: true}).identify + '-curd',
                children: curdFormTemplate
            });
        }
        return ResultUtil.success(pageTemplate);
    }

    /**
     * 渲染模块下代码
     * @param moduleId
     */
    async generateModuleCode(moduleId: any) {
        try {
            // 查询模块基本信息
            const moduleBaseInfo = await ModuleModel.findById(moduleId);
            // 查询模块下的所有服务
            const services = await HttpRequestModel.find({module: moduleId});
            const config = moduleBaseInfo.toJSON();
            config.serviceList = services.map(doc => doc.toJSON());

            const moduleTemplate: Array<any> = await this.util.resolveFramework('project-module', config, {content: JSON.stringify({name: 'guanyj'})});
            // 查询模块下的所有路由页面
            const pages = await PageModel.find({
                module: moduleId
            });

            const pageTemplates = [];
            const pageMap: any = {};
            for (let i = 0; i < pages.length; i++) {
                const pageInfo = await this.generateLayoutCode(pages[i]._id);

                pageTemplates.push({
                    id: pages[i].toJSON()._id,
                    pageInfo: pages[i].toJSON(),
                    templates: pageInfo.data
                });

                pageMap[pages[i].toJSON()._id] = pageInfo.data;
            }

            pageTemplates.forEach(item => {
                if (!item.pageInfo.parent) {
                    moduleTemplate.push({
                        isFile: false,
                        dictName: item.pageInfo.identify,
                        children: pageMap[item.id]
                    });
                } else {
                    pageMap[item.pageInfo.parent].push({
                        isFile: false,
                        dictName: item.pageInfo.identify,
                        children: pageMap[item.id]
                    });
                }
            });

            return ResultUtil.success(moduleTemplate);
        } catch (e) {
            console.error(e);
            return ResultUtil.error(500, '系统错误');
        }
    }
}
