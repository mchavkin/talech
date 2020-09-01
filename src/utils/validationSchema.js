import * as yup from 'yup';
import {gtin} from "cdigit";

const emptyStringToNull = (value, originalValue) => originalValue.trim() === "" ? null : value;

yup.setLocale({
    mixed: {
        default: 'validation.defaultError',
        required: ({path}) => ({key: 'validation.required', options: {path}}),
        notType: function notType(_ref) {
            switch (_ref.type) {
                case 'number':
                    return 'validation.NaN';
                case 'string':
                    return 'validation.NaS';
                default:
                    return 'validation.typeError';
            }
        }
    },
    number: {
        positive: ({path}) => ({key: 'validation.positive', options: {path}}),
        integer: ({path}) => ({key: 'validation.integer', options: {path}}),
        max: ({path, max}) => ({key: 'validation.maxError', options: {path, max}}),
        min: ({path, min}) => ({key: 'validation.minError', options: {path, min}})
    }
})

export const productValidationSchema = yup.object().shape({
    name: yup.string().required(),
    ean: yup.string().required().test('isEan', 'validation.eanRules', value => gtin.validate(value)),
    weight: yup.number().positive().max(50).nullable()
        .transform(emptyStringToNull),
    type: yup.string().required(),
    price: yup.number().required().positive().nullable()
        .transform(emptyStringToNull),
    quantity: yup.number().required().integer().min(0).nullable()
        .transform(emptyStringToNull)
})
