//to emulate Rest API all persistence functions
// wrapped in Promises with 1 s timeout

import * as persistence from '../persistence/storage'

const wrapFunctionInPromise = (func) => (...args) => new Promise((resolve, reject) => {
    setTimeout(() => {
        try{
            resolve(func(...args));
        }catch (error){
            reject(error);
        }
    }, 1000);
});


const api = Object.getOwnPropertyNames(persistence)
    .map(funcName => (
        {
            funcName: wrapFunctionInPromise(persistence[funcName])
        }
    )).reduce(Object.assign, {})

export default api;


