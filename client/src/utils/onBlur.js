import { validateEmail, validatePassword, validateUsername, validateTel } from "./validations";
import { checkEmailExistence } from "../services/authService";

export const handleEmailBlur = async (value, setFormErrors, isSignUpVisible) => {
    const error = validateEmail(value);
    if (error) {
        setFormErrors(prev => ({ ...prev, email: error }));
    } else if (isSignUpVisible) {
        try {
            const response = await checkEmailExistence(value);
            if (response.exists) {
                setFormErrors(prev => ({ ...prev, email: 'Email is already registered.' }));
            } else {
                setFormErrors(prev => ({ ...prev, email: '' }));
            }
        } catch (error) {
            console.error('Error checking email existence:', error);
            setFormErrors(prev => ({ ...prev, email: 'Unable to check email.' }));
        }
    } else {
        setFormErrors(prev => ({ ...prev, email: '' }));  
    }
};

export const handleUsernameBlur = (value, setFormErrors) => {
    const error = validateUsername(value);
    setFormErrors(prev => ({ ...prev, username: error }));
};

export const handleTelBlur = (value, setFormErrors) => {
    const error = validateTel(value);
    setFormErrors(prev => ({ ...prev, tel: error }));
};

export const handlePasswordBlur = (value, setFormErrors) => {
    const error = validatePassword(value);
    setFormErrors(prev => ({ ...prev, password: error }));
};

export const handleRePasswordBlur = (value, password, setFormErrors) => {
    const error = value === password ? '' : 'Passwords do not match';
    setFormErrors(prev => ({ ...prev, rePassword: error }));
};