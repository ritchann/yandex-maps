declare module ymaps {
    export function ready(parameters:ReadyParameters):vow.Promise;

    export function ready(successCallback:(ns?:ymaps) => any, errorCallback?:Function, context?:any):vow.Promise;

    export class ReadyParameters {
        require:string[];
        successCallback:(ns?:ymaps) => any; 
        errorCallback:Function;
        context:any;
    }
}