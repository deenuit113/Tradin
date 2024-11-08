import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return {
        isPasswordVisible,
        togglePasswordVisibility,
    };
};