import { useState } from 'react';

interface BackTestOptionError {
    typeError: boolean;
    strategyError: boolean;
    positionError: boolean;
    dateError: boolean;
}

export const useBackTestOptionError = () => {
    const [errors, setErrors] = useState<BackTestOptionError>({
        typeError: false,
        strategyError: false,
        positionError: false,
        dateError: false,
    });

    const setError = (errorType: keyof BackTestOptionError, value: boolean) => {
        setErrors(prevErrors => ({ ...prevErrors, [errorType]: value }));
    };

    const resetErrors = () => {
        setErrors({
        typeError: false,
        strategyError: false,
        positionError: false,
        dateError: false,
        });
    };

    return { errors, setError, resetErrors };
};