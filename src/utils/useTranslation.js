import {useTranslation as useTranslationOriginal} from "react-i18next";

// override useTranslation hook to accommodate yup error objects interpolation

const useTranslation = () => {
    const {t: originalT, ...rest}= useTranslationOriginal();
    const t = (obj, options) =>
        obj.key && obj.options ? originalT(obj.key, obj.options) : originalT(obj, options);
    return {t, ...rest};
}

export default useTranslation;
