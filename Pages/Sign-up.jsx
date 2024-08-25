import React, { useState } from 'react';
import Logo from '../src/assets/SocialConnect.svg';
import '../Css/Sign-up.css';
import { createUserWithEmailAndPassword } from '../src/FireBase';
import { auth } from '../src/FireBase';

export function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      // Handle password mismatch
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or handle successful sign-up
    } catch (error) {
      console.error('Sign-up error:', error.message);
      // Handle sign-up error
    }
  };

  return (
    <>
      <div className="PositionLogoText">
        <img className="Logo" src={Logo} alt="Logo" />
        <p>
          Join now to <span style={{ display: 'block' }}>Connect to the world</span> with us
        </p>
      </div>
      <div className="SigninBackgroundHolder">
        <div className="SigninHolder">
          <div className="TextHolder">
            <h1 className="WelcomeText">Sign-up Here</h1>
          </div>
          <div>
            <p className="DetailsText">Please Enter Your Details</p>
          </div>
          <div className="EmailSearchHolder">
            <p className="TextStyle">User Name</p>
            <input
              placeholder="Enter Username"
              className="InputStyle UsernameInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="EmailSearchHolder">
            <p className="TextStyle">Email</p>
            <input
              placeholder="Enter Email"
              className="InputStyle EmailInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="EmailSearchHolder">
            <p className="TextStyle">Password</p>
            <input
              placeholder="Enter Password"
              className="InputStyle PasswordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="EmailSearchHolder">
            <p className="TextStyle">Re-Enter Password</p>
            <input
              placeholder="Enter Password Again"
              className="InputStyle Re-EnterPasswordInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="RememberForgetText">
            <div className="RememberMeOption">
              <input className="RememberMeCheckBox" type="checkbox" />
              <p className="RememberMeText">Remember me</p>
            </div>
            <a className="ForgotPasswordLink" href="#">Forgot Password</a>
          </div>
          <div className="SigninOptionsHolder">
            <div className="SigninHolder">
              <button onClick={handleSignUp} className="SigninBtn BtnStyle">
                Sign up
              </button>
            </div>
            <div className="GoogleSigninHolder">
              <button className="GoogleSigninBtn BtnStyle">
                Sign up with Google
              </button>
            </div>
          </div>
          <div className="SignupTextHolder">
            <p className="SignupText">Already have an Account?</p>
            <a className="SignupLink" href="../index.html">Sign-in</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
