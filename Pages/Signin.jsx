import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../src/assets/SocialConnect.svg';
import '../src/App.css';
import { signInWithEmailAndPassword } from '../src/FireBase';
import { auth } from '../src/FireBase';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Feed'); // Navigate to Feed page upon successful sign-in
    } catch (error) {
      console.error('Sign-in error:', error.message);
      // Handle sign-in error
    }
  };

  return (
    <div>
      <div className="PositionLogoText">
        <img className="Logo" src={Logo} alt="Logo" />
        <p>
          Sign-in to <span style={{ display: 'block' }}>Connect to the world</span> with us
        </p>
      </div>
      <div className="SigninBackgroundHolder">
        <div className="SigninHolder0">
          <div className="TextHolder">
            <h1 className="WelcomeText">Welcome Back</h1>
          </div>
          <div>
            <p className="DetailsText">Please Enter Your Details</p>
          </div>
          <div className="EmailSearchHolder">
            <p className="EmailText">Email</p>
            <input
              placeholder="Enter Email"
              className="EmailInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="EmailSearchHolder">
            <p className="EmailText">Password</p>
            <input
              placeholder="Enter Password"
              className="EmailInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="RememberForgetText">
            <div className="RememberMeOption">
              <input className="RememberMeCheckBox" type="checkbox" />
              <p className="RememberMeText">Remember me</p>
            </div>
            <a className="ForgotPasswordLink" href="">
              Forgot Password
            </a>
          </div>
          <div className="SigninOptionsHolder">
            <div className="SigninHolder">
              <button className="SigninBtn BtnStyle" onClick={handleSignIn}>
                Sign in
              </button>
            </div>
            <div className="GoogleSigninHolder">
              <button className="GoogleSigninBtn BtnStyle">
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="SignupTextHolder">
            <p className="SignupText">Don't have an Account?</p>
            <Link className="SignupLink" to="/Signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
