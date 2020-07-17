import yargs from 'yargs'
import {generateDefaultFileAndWrite} from '../util'
export function start(){
    const argv = yargs.command('generate','生成某个schema的默认值',(v)=>{
        return v.option('f',{
            type:'string',
            alias:'file',
            demandOption:true,
            describe:'schema所在的文件',
            array:false
        }).option('s',{
            type:'string',
            alias:'schema',
            default:'default',
            description:'schema的名称',
            array:false
        }).option('d',{
            type:'string',
            alias:'dist',
            default:'default.js',
            array:false,
            description:'目标文件路径'
        }).option('t',{
            type:'string',
            alias:'type',
            default:'js',
            array:false,
            choices:['js','ts','json'],
            description:'输出类型'
        }).option('space',{
            type:'number',
            default:2,
            array:false,
            description:'空格数'
        })
    },(v)=>{
        generateDefaultFileAndWrite(v.f,v.s,v.t as 'json'|'js'|'ts',v.space,v.d).then((v)=>{
            console.log('done');
        }).catch((v)=>{
            console.error(v)
        })
    }).help().argv
}