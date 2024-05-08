import React, { useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import style from './SCSS/LoginSignUp.module.scss';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import PasswordStrengthMeter from '../utils/passwordStrength.jsx';
import { handleEmailBlur, handleUsernameBlur, handleTelBlur, handlePasswordBlur, handleRePasswordBlur } from '../utils/onBlur.js';
const SignUp = () => {
    const { loginUser, registerUser, logoutUser, user } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        tel: '',
        rePassword: '',
    });
    const [isSignUpVisible, setIsSignUpVisible] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const onBlurEmail = (e) => handleEmailBlur(e.target.value, setFormErrors, isSignUpVisible);
    const onBlurUsername = (e) => handleUsernameBlur(e.target.value, setFormErrors);
    const onBlurTel = (e) => handleTelBlur(e.target.value, setFormErrors);
    const onBlurPassword = (e) => handlePasswordBlur(e.target.value, setFormErrors);
    const onBlurRePassword = (e) => handleRePasswordBlur(e.target.value, formData.password, setFormErrors);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setSelectedImage(file);
            };
            reader.readAsDataURL(file);
        } else {
            setImageSrc('');
            setSelectedImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formErrors).some(error => error !== '')) {
            return;
        }
        try {
            if (isSignUpVisible) {
                await registerUser(formData);
            } else {
                await loginUser(formData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    const toggleVisibility = () => {
        setIsSignUpVisible(!isSignUpVisible);
        setFormErrors({});
        setSelectedImage(null);
        setImageSrc('');
    };

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <div className={style.parent}>
            {user ? (
                <div className={style.userDetails}>
                    <h1>User Details</h1>
                    {selectedImage && <img src={imageSrc} alt="Profile" className={style.profileImage} />}
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username || 'Not provided'}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className={`${style.container} ${isSignUpVisible ? style.active : ''}`}>
                    <div className={style['form-container'] + ' ' + (isSignUpVisible ? style['sign-up'] : style['sign-in'])}>
                        {isSignUpVisible ? (
                            <form onSubmit={handleSubmit}>
                                <h1>Create Account</h1>
                                <div className={style['social-icons']}>
                                    <FaGooglePlusG className={style.icon} />
                                    <FaFacebookF className={style.icon} />
                                    <FaGithub className={style.icon} />
                                    <FaLinkedinIn className={style.icon} />
                                </div>
                                <span>or use your email for registration</span>
                                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} onBlur={onBlurUsername} />
                                {formErrors.username && <div className={style.error}>{formErrors.username}</div>}
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={onBlurEmail} />
                                {formErrors.email && <div className={style.error}>{formErrors.email}</div>}
                                <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                                {selectedImage && <div className={style['image-preview']}><img src={imageSrc} alt="Preview" /></div>}
                                <input type="tel" name="tel" placeholder="Tel" value={formData.tel} onChange={handleChange} onBlur={onBlurTel} maxLength={10} />
                                {formErrors.tel && <div className={style.error}>{formErrors.tel}</div>}
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} onBlur={onBlurPassword} />
                                {formErrors.password && <div className={style.error}>{formErrors.password}</div>}
                                <PasswordStrengthMeter password={formData.password} />
                                <input type="password" name="rePassword" placeholder="Confirm Password" value={formData.rePassword} onChange={handleChange} onBlur={onBlurRePassword} />
                                {formErrors.rePassword && <div className={style.error}>{formErrors.rePassword}</div>}
                                <button type="submit">Sign Up</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h1>Sign In</h1>
                                <div className={style['social-icons']}>
                                    <FaGooglePlusG className={style.icon} />
                                    <FaFacebookF className={style.icon} />
                                    <FaGithub className={style.icon} />
                                    <FaLinkedinIn className={style.icon} />
                                </div>
                                <span>or use your email and password</span>
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={onBlurEmail} />
                                {formErrors.email && <div className={style.error}>{formErrors.email}</div>}
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} onBlur={onBlurPassword} />
                                {formErrors.password && <div className={style.error}>{formErrors.password}</div>}
                                <button type="submit">Sign In</button>
                                <a href="#">Forget Your Password?</a>
                            </form>
                        )}
                    </div>
                    <div className={style['toggle-container']}>
                        <div className={style.toggle}>
                            <div className={style['toggle-panel'] + ' ' + (isSignUpVisible ? style['toggle-left'] : style['toggle-right'])}>
                                <button onClick={toggleVisibility}>{isSignUpVisible ? "Sign In" : "Sign Up"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;