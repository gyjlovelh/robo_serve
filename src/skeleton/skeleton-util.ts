/**
 * Created by guanyj on  1/9/20
 */
import * as path from 'path';
import * as art from 'art-template';
import * as fs from 'fs-extra';

class SimpleGridSetting {
    [key: string]: any;

    // 标识【文件命名】
    identity: string;

    selectable: boolean;

    frontendProcess: boolean;

    // 列配置
    columns: Array<any> = [];

    // 自定义功能配置
    actions: Array<any> = [];

    // 内置功能按钮配置
    showFilterIcon: boolean;
    showExportIcon: boolean;
    showColSettingIcon: boolean;
    showRefreshIcon: boolean;

    service: any;

    constructor(pageInfo: any, layoutInfo: any) {
        Object.keys(pageInfo).forEach(key => {
            this[key] = pageInfo[key];
        });
        const content = JSON.parse(layoutInfo.content);

        Object.keys(content).forEach(key => {
            this[key] = content[key];
        });
    }
}


export class SkeletonUtil {

    async resolveFramework(skeletonName: string, pageInfo: any, layoutInfo: any) {
        let dir = path.join(__dirname, `./${skeletonName}`);
        const sourceFiles = fs.readdirSync(dir);
        const conf = new SimpleGridSetting(pageInfo, layoutInfo);

        /** 注册过滤函数 */
        // 1.1 转换普通类型至boolean类型
        art.defaults.imports.parseBoolean = (value: any) => !!value;
        // 1.2 identify => ComponentCameName
        art.defaults.imports.cameName = (value: string) => this.getCameName(value);
        // 1.2.1 首字母小写的驼峰命名
        art.defaults.imports.letterCameName = (value: string) => this.getCameName(value, false);
        // 1.3 转换http请求Method
        art.defaults.imports.httpMethod = (value: string) => `${value.toLowerCase()}`;
        // 数组去重
        art.defaults.imports.distinct = (list: any, primaryKey: string) => {
            let result = [];
            let obj: any = {};
            for (let item of list) {
                if (primaryKey) {
                    if (!obj[item[primaryKey]]) {
                        result.push(item);
                        obj[item[primaryKey]] = 1;
                    }
                } else {
                    if (!obj[item]) {
                        result.push(item);
                        obj[item] = 1;
                    }
                }
            }
            return result;
        };
        // 1.4 获取与前端一直的过滤类型
        art.defaults.imports.frontFilterType = (value: string) => ({
            string: 'string',
            numeric: 'numeric',
            dictionary: 'dropdown',
            httpReq: 'dropdown',
            enum: 'dropdown',
            date: 'date'
        } as any)[`${value}`];
        // 1.5 表单不同type的详细配置
        art.defaults.imports.typeConfKeys = (control: any) => {
            const typeKey = `${control.type}Conf`;
            const optionsTypeKey = `${control.type}Conf_optionsType`;
            return Object.keys(control)
                .filter(key => key.startsWith(`${control.type}Conf`))
                .filter(key => key !== optionsTypeKey)
                .map(key => { // 如 `radioConf_optionsType`
                    // 具体的conf字段
                    const confKey = `${key.replace(`${typeKey}_`, '')}`;
                    // 对应的conf配置值
                    let confValue = control[key];
                    // 配置radio/checkbox/dropdown的键值对取值来源
                    if (confKey === 'options') {
                        let apiName = '';
                        let serverName = '';
                        // 判断取值来源 `enum` `dictionary` `httpReq`
                        const optionsTypeValue = control[optionsTypeKey];
                        if (optionsTypeValue === 'enum') {
                            serverName = '$enum';
                            apiName = 'getEnumListByName';
                            confValue = this.getCameName(confValue);
                            confValue = `this.${serverName}.${apiName}(${confValue})`;
                            return `control.${typeKey}.${confKey} = ${confValue};`;
                        } else if (optionsTypeValue === 'dictionary') {
                            serverName = '$dictionary';
                            apiName = 'getDictionaryByCode';
                            confValue = `DICTIONARY_CONST.${this.getCameName(confValue, false)}`;
                            confValue = `this.${serverName}.${apiName}(${confValue})`;
                            return `control.${typeKey}.${confKey} = ${confValue};`;
                        } else if (optionsTypeValue === 'httpReq') {
                            serverName = '$service';
                            apiName = `${this.getCameName(confValue, false)}`;
                            confValue = `this.${serverName}.${apiName}()`;
                            return `${confValue}.subscribe(result => {\r\n\t\t\tcontrol.${typeKey}.${confKey} = result.data;\r\n\t\t});`;
                        }
                    } else {
                        if (typeof confValue === 'string') {
                            confValue = `'${confValue}'`;
                        }
                        return `control.${typeKey}.${confKey} = ${confValue};`;
                    }
            }).join('\r\n\t\t');
        };

        const getFileType = function(fileName: string) {
            const fileTypes: any = {
                module: '.module.ts',
                service: '.service.ts',
                component: '.component.ts',
                html: '.html',
                scss: '.scss',
                json: '.json',
                js: '.js'
            };
            let fileType = '';
            Object.keys(fileTypes).forEach(key => {
                if (fileName.endsWith(fileTypes[key])) {
                    fileType = key;
                }
            });
            return fileType;
        };

        return (function resolve(files, root): any {
            return files.map(filename => {
                const filePath = path.join(root, filename);
                const stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    const realName = filename.replace(/frame/, conf.identify).replace('.art', '');

                    return {
                        isFile: true,
                        fileName: realName,
                        fileType: getFileType(realName),
                        code: art.render(fs.readFileSync(filePath).toString(), {
                            source: conf
                        })
                    }
                } else {
                    return {
                        isFile: false,
                        dictName: filename,
                        children: resolve(fs.readdirSync(filePath), filePath)
                    }
                }
            });
        })(sourceFiles, dir);
    }

    /**
     * 获取驼峰命名
     * @param value
     * @param startUpperCase
     */
    private getCameName(value: string, startUpperCase = true) {
        return `${startUpperCase ? '-' : ''}${value}`.replace(/[-._](\w)/g, (all, letter: string) => letter.toUpperCase());
    }
}


