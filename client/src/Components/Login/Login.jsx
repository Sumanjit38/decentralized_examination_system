import React from 'react'
import './login.css'
import "../../App.css"
import { Link, NavLink } from 'react-router-dom'

import img from '../../assets/img.jpg'
import logo from '../../assets/logo.jpg'

import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {RiLoginBoxLine} from 'react-icons/ri'

const Login = () => {
  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="imageDiv">
          <img src={img}></img>

          <div className="textDiv">
            <h2 className="title">Login</h2>
            <p>Welcome Back!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don't have an account</span>
            <Link to = {'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form action="" className="form grid">
            <span className='showMessage'>Login Status will go here</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserAlt className = 'icon' />
                <input type="text" id='username' placeholder='Enter Username' />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <RiLockPasswordFill className = 'icon' />
                <input type="password" id='password' placeholder='Enter Password' />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
              <RiLoginBoxLine className='icon' />
            </button>

            <a href='/dashboard'>Dashboard</a>

            <span className='forgotPassword'>
              Forgot your password ? <a href=''>Click Here</a>
            </span>

          </form>
        </div>
      </div>
    </div>
  )
}
export default Login