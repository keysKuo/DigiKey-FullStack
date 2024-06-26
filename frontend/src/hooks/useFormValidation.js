// useFormValidation.js
import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validationRules) => {
    const [formValidationData, setFormValidationData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        validateForm();
        // eslint-disable-next-line
    }, [formValidationData]);
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Apply validation rules
        for (const field in validationRules) {
            const validationFunction = validationRules[field];
            const fieldValue = formValidationData[field];

            const fieldIsValid = validationFunction(fieldValue, formValidationData);
            const childAllNull =
                typeof fieldIsValid === 'object' && fieldIsValid !== null
                    ? Object.values(fieldIsValid).every((value) => value === null)
                    : false;
            if (fieldIsValid !== null && !childAllNull) {
                isValid = false;
                newErrors[field] = fieldIsValid;
            }
        }

        setErrors(newErrors);
        setFormValid(isValid);
    };
    return {
        formValidationData,
        errors,
        isFormValid,
        setFormValidationData,
    };
};

export default useFormValidation;
