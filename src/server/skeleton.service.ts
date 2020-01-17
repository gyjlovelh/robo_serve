/**
 * Created by guanyj on  1/9/20
 */


import {SkeletonUtil} from "../skeleton/skeleton-util";
import {ResultUtil} from "../utils/result.util";
import {PageModel} from '../models/page.model';
import {LayoutModel} from '../models/layout.model';
import {HttpRequestModel} from "../models/http-request.model";
import {ModuleModel} from "../models/module.model";
import {ProjectModel} from "../models/project.model";

export class SkeletonService {
    private context: any;
    util: SkeletonUtil;

    get projectId() {
        return this.context.header.project;
    }

    constructor() {
        this.util = new SkeletonUtil();
    }

    public inject(ctx: any): SkeletonService {
        this.context = ctx;
        return this;
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
            // 查询模块下的所有路由页面
            const pages = await PageModel.find({module: moduleId}).populate('parent');
            const config = moduleBaseInfo.toJSON();
            config.serviceList = services.map(doc => doc.toJSON());
            config.routerList = pages.map(doc => doc.toJSON());
            // 生成模块结构代码
            const moduleTemplate: Array<any> = await this.util.resolveFramework('project-module', config, {content: JSON.stringify({name: 'guanyj'})});


            const pageTemplates = [];
            const pageMap: any = {};
            for (let i = 0; i < pages.length; i++) {
                const pageJson = pages[i].toJSON();
                const pageInfo = await this.generateLayoutCode(pageJson._id);

                pageTemplates.push({
                    id: pageJson._id,
                    pageInfo: pageJson
                });

                pageMap[pageJson._id] = pageInfo.data;
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

    /**
     * 生成工程应用的代码骨架
     */
    async generateFramework() {
        try {
            const projectDoc = await ProjectModel.findById(this.projectId);
            const projectJson = projectDoc.toJSON();
            // 遍历工程下所有模块
            const modules = await ModuleModel.find({project: this.projectId});
            projectJson.modules = modules.map(item => item.toJSON());

            // 生成工程的骨架文件
            const frameworkTemplate: Array<any> = await this.util.resolveFramework('framework', projectJson, {content: JSON.stringify({name: '123'})});
            // 获取frame下面的src/app/module目录
            const target = (function focusTargetDict(dict: Array<any>, targetDictNames: Array<string>, index: number): any {
                if (dict && dict.length > 0) {
                    const target = dict.filter(item => item.dictName === targetDictNames[index]);
                    if (target && target.length > 0) {
                        if (index === targetDictNames.length - 1) {
                            return target[0];
                        }
                        return focusTargetDict(target[0].children, targetDictNames, index + 1);
                    }
                    return null;
                }
                return null;
            })(frameworkTemplate, 'src/app/module'.split('/'),0);

            for (let i = 0; i < modules.length; i++) {
                const module = modules[i];
                const moduleResult = await this.generateModuleCode(module._id);
                if (moduleResult.data && target && target.children) {
                    target.children.push({
                        dictName: module.toJSON().identify,
                        isFile: false,
                        children: moduleResult.data
                    });
                }
            }

            return ResultUtil.success(frameworkTemplate);
        } catch (e) {
            console.error(e);
            return ResultUtil.error(500, '系统错误');
        }
    }
}
