import {ObjectSchema} from '@hapi/joi'
export function createDefaultObject(schema:ObjectSchema){
    const {error,value} = schema.default().validate(undefined)
    if(error)throw error;
    return value;
}
export function JSON2JS(obj:Record<string,any>,space:number=2,deep:number=0):string{
    if(deep === 0){
        return (`{${JSON2JS(obj,space,deep+1)}}`)
    }
    let data = "\n";
    for(let key in obj){
       
        switch(typeof obj[key]){
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
                data+=`${getSpace(space,deep)}${key}:${valueDecorate(obj[key])},\n`
            break;
            case 'object':
                if(!obj[key]){
                    data+= `${getSpace(space,deep)}${key}:null,\n`
                    continue;
                }
                if(obj[key] instanceof Array)break;
                data+= `${getSpace(space,deep)}${key}:{${JSON2JS(obj[key],space,deep+1)}${getSpace(space,deep)}},\n`
            break;
            default:
                data+= ''
        }
        if(obj[key] instanceof Array){
            const arr:any[] =  obj[key];
            data+=`${getSpace(space,deep)}${key}:[${arr.map(valueDecorate).join()}],\n`
        }
    }
    return data.replace(/,\n$/,"\n");
}
function valueDecorate(val:any){
    switch(typeof val){
        case 'string':
            return `"${val}"`
        case 'number':
        case 'boolean':
            return `${val}`
        case 'object':
            if(!val)return 'null';
            return `${val}`
        case 'undefined':
            return 'null'
        default:
            return `${val}`
    }
}
function getSpace(space:number,deep:number){
    return " ".repeat(space).repeat(deep)
}
