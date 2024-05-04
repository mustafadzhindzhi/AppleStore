import React, { useState } from 'react';
import style from '../SCSS/LoginSignUp.module.scss';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'; // Importing specific icons
import { register, login } from '../../services/authService';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    tel: '',
    password: '',
    rePassword: '',
    rememberMe: false
  });
  const [isSignUpVisible, setIsSignUpVisible] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State to store error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing errors
    if (isSignUpVisible) {
      // Handle registration
      try {
        const response = await register(formData);
        setSubmissionMessage('Registration successful! Please log in.');
        console.log(response);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message || 'Failed to register');
      }
    } else {
      // Handle login
      try {
        const response = await login({ email: formData.email, password: formData.password });
        setSubmissionMessage('Login successful!');
        console.log(response);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message || 'Failed to login');
      }
    }
  };

  const toggleVisibility = () => {
    setIsSignUpVisible(!isSignUpVisible);
    setErrorMessage('');  // Clear errors on view change
    setSubmissionMessage('');
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
              <input type="tel" name="tel" placeholder="Tel" maxLength="10" onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              <input type="password" name="rePassword" placeholder="Confirm Password" onChange={handleChange} />
              <button type="submit">Sign Up</button>
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
              <a href="#">Forget Your Password?</a>
              <button type="submit">Sign In</button>
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
        {submissionMessage && (
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', textAlign: 'center' }}>
            <strong>{submissionMessage}</strong>
          </div>
        )}
        {errorMessage && (
          <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
