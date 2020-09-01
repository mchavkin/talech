//to emulate Rest API all persistence functions just wrapped in Promises

import * as persistence from '../persistence/storage'

const wrapFunctionInPromise = (func) => async (...args) => {
    try {
        return await func(...args);
    } catch (error) {
        throw error;
    }
}

const api = Object.getOwnPropertyNames(persistence)
    .map(funcName => (
        {
            funcName: wrapFunctionInPromise(persistence[funcName])
        }
    )).reduce(Object.assign, {})

export default api;


