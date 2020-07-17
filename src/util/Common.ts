import {ObjectSchema} from '@hapi/joi'
export function createDefaultObject(schema:ObjectSchema){
    const {error,value} = schema.default().validate(undefined)
    if(error)throw error;
    return value;
}
export function JSON2JS(obj:any,space:number=2,deep:number=1):string{
    let data = "\n";
    switch(typeof obj){
        case 'object':
            if(!obj){
                return 'null';
            }
            data=`{\n`
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
                        data+= `${getSpace(space,deep)}${key}:${JSON2JS(obj[key],space,deep+1)},\n`
                    break;
                    default:
                        data+= ''
                }
                if(obj[key] instanceof Array){
                    const arr:any[] =  obj[key];
                    data+=`${getSpace(space,deep)}${key}:[${arr.map((v)=>JSON2JS(v,space,deep+1)).join()}],\n`
                }
            }
            data+=`${getSpace(space,deep-1)}}`
            break;
        default:
           return `${valueDecorate(obj)}`;
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
    return " ".repeat(Math.max(space,0)).repeat(Math.max(deep,0))
}
