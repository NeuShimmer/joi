import _Joi from '@hapi/joi';

export class IsNotNull{
    readonly _Z:true = true
}
export class Type<A, B>{
    readonly _A: A = {} as A;
    readonly _B: B = {} as B;
}

export interface Props {
    [key: string]: Mixed;
}
export interface Any extends Type<any, any> {
}

export interface Mixed extends Type<any, any> {
}
type NonSomeable<A,B> = A extends B?never:A;

export type IsStrict = undefined extends object?false:true;

export type TypeOf<RT extends Any|IsNotNull> = RT extends Any?RT extends IsNotNull?FilterOp<RT['_A']>:FilterOp<RT['_A']>|undefined:never

export type IsUndefined<T> = {[K in keyof T]:undefined extends T[K]  ?K:never}[keyof T]

export type PartialPick<T,K extends keyof T> = {[P in K]?:T[P]}

export type IsNonUndefined<T> = {[K in keyof T]:undefined extends T[K] ?never:K}[keyof T]

export type FilterOp<T> = IsStrict extends true? T extends Array<infer A>?Array<FilterUndefined<A>>:T extends Date?T:FilterUndefined<T>:T

export type FilterUndefined<T> =T extends object? Pick<T,IsNonUndefined<T>> &PartialPick<T, IsUndefined<T>>:T

export type SchemaTypeOf<RT extends Any> = FilterOp<RT['_A']>

export function validate<T extends Joi.AnySchemaA<Any>>(schema: T, value: any): TypeOf<T> {
    return schema.validate(value).value
}


declare namespace Joi {
    interface ValidationResultA<T extends Any>{
        error: _Joi.ValidationError;
        errors: _Joi.ValidationError;
        warning: _Joi.ValidationError;
        value:T['_A']
    }
    export class AnyTypeFactor<T extends Any> extends Type<T['_A'], T['_B']>{ }
    export class BaseTypeFactor<T extends Any> extends AnyTypeFactor<T>{
        validate(value: any, options?: _Joi.ValidationOptions | undefined): ValidationResultA<this>
        required(): this & IsNotNull
        valid<P extends this['_A']>(...args:P[]):AnySchemaA<Type<P,false>>
        default(arg?:any):this& IsNotNull
        custom<Q extends (value:any,helpers?:_Joi.CustomHelpers)=>any>(fn: Q, description?: string):this & BaseTypeFactor<Type<NonSomeable<ReturnType<Q>,_Joi.ErrorReport>,false>>
    }
    export class EmptyTypeFactor<T extends Any> extends AnyTypeFactor<T>{}
    export class ArrayTypeFactor<T extends Any> extends Type<T['_A'], T['_B']>{

        /**
         * List the types allowed for the array values.
         * type can be an array of values, or multiple values can be passed as individual arguments.
         * If a given type is .required() then there must be a matching item in the array.
         * If a type is .forbidden() then it cannot appear in the array.
         * Required items can be added multiple times to signify that multiple items must be found.
         * Errors will contain the number of items that didn't match.
         * Any unmatched item having a label will be mentioned explicitly.
         *
         * @param type - a joi schema object to validate each array item against.
         */
        items<R extends _Joi.SchemaLike & Any>(...types: R[]): ArraySchemaA<Type<R['_A'][], R['_B']>>
        items<R extends _Joi.SchemaLike & Any>(types: R[]): ArraySchemaA<Type<R['_A'], R['_B']>>
        items<R>(...types: R[]): ArraySchemaA<Type<R[], false>>

    }
    export type WhenOptionsA<A extends Any> = {
        /**
 * the required condition joi type.
 */
        is: _Joi.SchemaLike;
        /**
         * the alternative schema type if the condition is true. Required if otherwise is missing.
         */
        then: _Joi.SchemaLike & A | Joi.AnyTypeFactor<Any>;
        /**
         * the alternative schema type if the condition is false. Required if then is missing
         */
        //otherwise?: _Joi.SchemaLike;
    }
    export type WhenOptionsB<A extends Any, B extends Any> = {
        is: _Joi.SchemaLike
        then: _Joi.SchemaLike & A | Joi.AnyTypeFactor<Any>
        otherwise: _Joi.SchemaLike & B | Joi.AnyTypeFactor<Any>
    }
    export type SchemaLikeA = string | number | boolean | object | null | Joi.BaseTypeFactor<Any>
    export class AlternativesTypeFactor<T extends Any> extends Type<T['_A'], T['_B']>{
        when<P extends Any>(ref: string | _Joi.Reference, options: WhenOptionsA<P>): AlternativesSchemaA<P>;
        when<P extends Any, D extends Any>(ref: string | _Joi.Reference, options: WhenOptionsB<P, D>): AlternativesSchemaA<P | D>
    }
    export type ObjectSchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.ObjectSchema
    export type StringSchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.StringSchema
    export type NumberSchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.NumberSchema
    export type BooleanSchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.BooleanSchema
    export type ArraySchemaA<T extends Any> = ArrayTypeFactor<T> & Joi.AnySchemaA<T> & _Joi.ArraySchema
    export type AnySchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.AnySchema
    export type DateSchemaA<T extends Any> = BaseTypeFactor<T> & _Joi.DateSchema
    export type AlternativesSchemaA<T extends Any> = AlternativesTypeFactor<T> & _Joi.AnySchema & _Joi.AlternativesSchema
    export type AlternativesSchemaB<T extends Any, P extends Any> = (AlternativesTypeFactor<T> | AlternativesSchemaA<P>) & _Joi.AnySchema & _Joi.AlternativesSchema
    export type ParamType<R extends Props> = Type<{ [K in keyof R]: TypeOf<R[K]> }, false>;

    export function object<R extends Props>(required: R): ObjectSchemaA<ParamType<R>>
    export function object<T extends {}>():ObjectSchemaA<Type<T,false>>
    export function string(): StringSchemaA<Type<string, false>>
    export function number(): NumberSchemaA<Type<number, false>>
    export function boolean(): BooleanSchemaA<Type<boolean, false>>
    export function bool(): BooleanSchemaA<Type<boolean, false>>
    export function array(): ArraySchemaA<Type<any[], false>>
    export function any(): AnySchemaA<any>
    export function date():DateSchemaA<Type<Date,false>>
    export function when<P extends Any>(ref: string | _Joi.Reference, options: WhenOptionsA<P>): AlternativesSchemaA<P>;
    export function when<P extends Any, D extends Any>(ref: string | _Joi.Reference, options: WhenOptionsB<P, D>): AlternativesSchemaB<P, D>
    export function combine<T extends Any>(args:T[]):Joi.AnySchemaA<T>
}
(_Joi as any)['combine'] = function<T extends Any>(args:T[]):Joi.EmptyTypeFactor<T>{
    return args as any
}
type exJoi = typeof Joi & typeof _Joi
var __Joi: exJoi = <any>_Joi as exJoi;
export default __Joi;