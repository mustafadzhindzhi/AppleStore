import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../services/authService';
import style from './SCSS/LoginSignUp.module.scss';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        tel: '',
        rePassword: ''
    });
    const [isSignUpVisible, setIsSignUpVisible] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'tel') {
            formattedValue = Number(value);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setImageSrc(event.target.result);
            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUpVisible && formData.password !== formData.rePassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        try {
            const response = isSignUpVisible ? await register(formData) : await login(formData);
            localStorage.setItem('accessToken', response.accessToken); 
            navigate('/'); 
        } catch (error) {
            console.error("Error during form submission:", error);
            setErrorMessage(error.message || 'Failed to process the form');
        }
    };

    const toggleVisibility = () => {
        setIsSignUpVisible(!isSignUpVisible);
        setErrorMessage('');
    };

    return (
        <div className={style.parent}>
            <div className={`${style.container} ${isSignUpVisible ? style.active : ''}`}>
                <div className={style['form-container'] + ' ' + (isSignUpVisible ? style['sign-up'] : style['sign-in'])}>
                    {isSignUpVisible ? (
                        <form onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <div className={style['social-icons']}>
                                <a href="#" className={style.icon}><FaGooglePlusG /></a>
                                <a href="#" className={style.icon}><FaFacebookF /></a>
                                <a href="#" className={style.icon}><FaGithub /></a>
                                <a href="#" className={style.icon}><FaLinkedinIn /></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                            <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                            {selectedImage && <div className={style['image-preview']}><img src={imageSrc} alt="Preview" /></div>}
                            <input type="tel" name="tel" placeholder="Tel" onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <input type="password" name="rePassword" placeholder="Confirm Password" onChange={handleChange} />
                            <button type="submit">Sign Up</button>
                            {errorMessage && (
                                <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h1>Sign In</h1>
                            <div className={style['social-icons']}>
                                <a href="#" className={style.icon}><FaGooglePlusG /></a>
                                <a href="#" className={style.icon}><FaFacebookF /></a>
                                <a href="#" className={style.icon}><FaGithub /></a>
                                <a href="#" className={style.icon}><FaLinkedinIn /></a>
                            </div>
                            <span>or use your email and password</span>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <button type="submit">Sign In</button>
                            <a href="#">Forget Your Password?</a>
                            {errorMessage && (
                                <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    )}
                </div>
                <div className={style['toggle-container']}>
                    <div className={style.toggle}>
                        <div className={style['toggle-panel'] + ' ' + style['toggle-left']}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button onClick={toggleVisibility}>Sign In</button>
                        </div>
                        <div className={style['toggle-panel'] + ' ' + style['toggle-right']}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details and get started</p>
                            <button onClick={toggleVisibility}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;