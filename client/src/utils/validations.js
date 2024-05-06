export const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email) ? '' : 'Invalid email format.';
};

export const validatePassword = (password) => {
    if (!password) return 'Password is required.';

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!regex.test(password)) {
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.';
    }

    return '';
};

export const validateUsername = (username) => {
    if (!username) return 'Username is required.';
    if (username.trim().length <= 1) return 'Username must be at least 2 characters.';
    return '';
};

export const validateTel = (tel) => {
    if (!tel) return 'Telephone number is required.';
    const regex = /^[0-9]{10,15}$/;
    return regex.test(tel) ? '' : 'Invalid telephone number.';
};

export const validateRegisterForm = (formData) => {
    return {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        rePassword: formData.password === formData.rePassword ? '' : 'Passwords do not match',
        username: validateUsername(formData.username),
        tel: validateTel(formData.tel)
    };
};

export const validateLoginForm = (formData) => {
    return {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password)
    };
};