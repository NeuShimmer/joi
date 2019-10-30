import { Joi,TypeOf, SchemaTypeOf } from '../'
type SuccessedGet = {
    success:true,
    data:any
}
type FailedGet = {
    success:false,
    message:any,
    code:number
}
export type InterfaceGet = SuccessedGet|FailedGet
export interface Service {
    getTickets():Promise<Ticket[]>
    getSeats(ticket:Ticket):Promise<Seat[][]>
    postInfo(info:TicketPost):Promise<InterfaceGet>
    postError(errorInfo:any):Promise<InterfaceGet>
}
var TicketQuestionSchema = Joi.object({
    id:Joi.number().required(),
    type:Joi.string().valid('select','radio','text').required(),
    title:Joi.string().required(),
    description:Joi.string().required(),
    optionList:Joi.when(Joi.ref('type'),{is:['select','radio'],then:Joi.array().items('string')})
})
var TicketModuleSchema = Joi.object({
    id:Joi.number().required(),
    title:Joi.string().required(),
    questionList:Joi.array().items(TicketQuestionSchema).required()
})
var TicketSchema = Joi.object({
    id:Joi.number().required(),
    title:Joi.string().required(),
    baseInfos:Joi.array().items(TicketQuestionSchema),
    description:Joi.string().required(),
    remainingQuantity:Joi.number().min(0).required(),
    price:Joi.number().min(0).required(),
    type:Joi.string().valid('normal','moreinfo').default('normal'),
    modules:Joi.when(Joi.ref('type'),{is:'moreinfo',then:Joi.array().items(TicketModuleSchema).required()})
})

var TicketPostInfoQuestionSchema = Joi.object({
    title:Joi.string().required(),
    answer:Joi.string().required()
})
var TicketPostInfoModuleSchema = Joi.object({
    id:Joi.number().required(),
    questionList:Joi.array().items(TicketPostInfoQuestionSchema)
})

var ErrorPostSchema = Joi.object({
    message:Joi.string().required(),
    env:Joi.string()
})
var SeatInfoSchema = Joi.object({
    position:Joi.object({
        x:Joi.number().min(0).required(),
        y:Joi.number().min(0).required()
    }).required(),
    status:Joi.string().valid('enable','disable','lock','used').required()
})
var TicketPostInfoTickets = Joi.object({
    id:Joi.number().required(),
    baseInfos:Joi.array().items(TicketPostInfoQuestionSchema),
    type:Joi.string().valid('normal','moreinfo').default('normal'),
    moduleInfos:Joi.when(Joi.ref('type'),{is:'moreinfo',then:Joi.array().items(TicketPostInfoModuleSchema).required()})
})
var TicketPostInfoSchema = Joi.object({
    tickets:Joi.array().items(TicketPostInfoTickets).min(1),
    lockedSeat:Joi.array().items(SeatInfoSchema),
    totalInfo:Joi.object({
        totalTickets:Joi.number().min(0),
        totalPrice:Joi.number().min(0)
    })
    
})

class CustomClass{
    aaa:string;
    bbb(){
        return this.aaa;
    }
}
let customSchema = Joi.object({
    ttt:Joi.object().custom((v,h)=>{
        if(v instanceof CustomClass){
            return v;
        }
        return h.error('The value must be an instance of CustomClass')
    })
})
export type CustomTest = SchemaTypeOf<typeof customSchema>


export var Ticket = TicketSchema;
export type Ticket = TypeOf<typeof TicketSchema>
export var TicketQuestion = TicketQuestionSchema;
export type TicketQuestion = TypeOf<typeof TicketQuestionSchema>

export var TicketModule = TicketModuleSchema;
export type TicketModule = TypeOf<typeof TicketModuleSchema>

export var Seat = SeatInfoSchema;
export type Seat = TypeOf<typeof SeatInfoSchema>

export var TicketPost = TicketPostInfoSchema;
export type TicketPost = TypeOf<typeof TicketPostInfoSchema>

export var TicketPostTickets = TicketPostInfoTickets;
export type TicketPostTickets = TypeOf<typeof TicketPostInfoTickets>

export var TicketPostModule = TicketPostInfoModuleSchema;
export type TicketPostModule = TypeOf<typeof TicketPostInfoModuleSchema>

export var TicketPostQuestion = TicketPostInfoQuestionSchema;
export type TicketPostQuestion = TypeOf<typeof TicketPostInfoQuestionSchema>

export var ErrorPost = ErrorPostSchema;
export type ErrorPost = TypeOf<typeof ErrorPostSchema>