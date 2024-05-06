import React from 'react';
import style from '../pages/SCSS/LoginSignUp.module.scss';

const PasswordStrengthMeter = ({ password }) => {
    const score = calculatePasswordStrength(password);

    const createPasswordLabel = (score) => {
        switch(score) {
            case 0: return 'Very weak';
            case 1: return 'Weak';
            case 2: return 'Moderate';
            case 3: return 'Strong';
            case 4: return 'Very strong';
            default: return '';
        }
    }

    return (
        <div className={style.passwordStrengthMeter}>
            <progress
                className={`${style[`passwordStrengthProgress${score}`]}`}
                value={score}
                max="4"
            />
            <label className={style.passwordStrengthLabel}>
                {password && (
                    <>
                        <strong>Password strength:</strong> {createPasswordLabel(score)}
                    </>
                )}
            </label>
        </div>
    );
};

const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) {
        return score;
    }

    const lengthCriteria = password.length >= 8;
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const digitCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);

    if (lengthCriteria) score += 1;
    if (lowercaseCriteria) score += 1;
    if (uppercaseCriteria) score += 1;
    if (digitCriteria) score += 1;
    if (specialCharCriteria) score += 1;

    return Math.min(score, 4); 
};

export default PasswordStrengthMeter;