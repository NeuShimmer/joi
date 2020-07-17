import {createDefaultObject,JSON2JS} from '../util'
import {promises as fs} from 'fs'
import path from 'path'
import beautify from 'json-beautify'
type GenerateDistType = 'json'|'js'|'ts';
export function generateDefaultFile(filePath:string,schemaName:string,distType:GenerateDistType,spaceCount:number){
    const file = path.resolve(filePath);
    spaceCount = Math.round(spaceCount);
    const res = createDefaultObject(require(file)[schemaName])

    let fileData:string
    switch(distType){
        case 'js':
            fileData = `module.exports=${JSON2JS(res,spaceCount)}`;
            break;
        case 'json':
            fileData = beautify(res,null as any,spaceCount)
            break;
        case 'ts':
            fileData = `export default ${JSON2JS(res,spaceCount)}`
            break;
        default:
            fileData = `module.exports=${JSON2JS(res,spaceCount)}`;
    }
    return fileData;
}
export async function generateDefaultFileAndWrite(filePath:string,schemaName:string,distType:GenerateDistType,spaceCount:number,distFileName:string){
    distFileName = path.resolve(distFileName);
    filePath = path.resolve(filePath)
    const data = generateDefaultFile(filePath,schemaName,distType,spaceCount);
    return await fs.writeFile(distFileName,data)
}