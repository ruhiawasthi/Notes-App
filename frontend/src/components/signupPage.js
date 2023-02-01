import React, { useState } from 'react';
import axios from '../Api.js';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState();
  const navigate = useNavigate();

  function SignupFun(e) {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Password not matching");
      return;
    }
    else {
      axios.post("http://localhost:4000/Signup",
        {
          email: email,
          password: password,

        })
        .then((response) => {
          if (response.status === 200) {
            navigate('/');
          }

        })
        .catch((err) => {
          alert("Check again");
        })
    }
  }



  return (
    <>
      <div class="center">
        <h1>Signup</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required onChange={e => setEmail(e.target.value)}></input>
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={e => setPassword(e.target.value)}></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={e => setconfirmPass(e.target.value)}></input>
            <span></span>
            <label>confirm Password?</label>
          </div>
          <button onClick={SignupFun}> signup </button>
          <div class="login_link">
            Already signed up? <a href="/login">Login</a>
          </div>
        </form>
      </div>

    </>
  )
}

export default SignupPage;