/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { loginSuccess, addUser } from '../../redux/authRedux'
import Doctors from '../../../src/doctors.svg'
import Swal from 'sweetalert2'
import { MouseEvent } from 'react'
import apiInstance from '../../utils/api'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const url = useSelector(state => state.auth.url)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleClickShowEmail = () => setShowEmail(show => !show)

  const handleMouseDownEmail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const setlogin = () => {
    event.preventDefault()

    const data = {
      email: email,
      password: password
    }

    apiInstance
      .post(
        'auth/login',
        data
      )
      .then(function (response) {
        Swal.fire({
          title: 'Success',
          text: 'successfully Login!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(function () {
          console.log(response.data.user.role, 'login res rol')

          dispatch(loginSuccess())
          dispatch(addUser(response.data))

          if (response.data.user.role == 'Sales') {
            navigate('/lab-test')
          }
          if (response.data.user.role == 'Finance') {
            navigate('/tvoucherList')
          }
          if (response.data.user.role == 'Admin') {
            navigate('/lab-test')
          }
          if (response.data.user.role == 'Laboratory') {
            navigate('/tresultList')
          }
        })
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Something Wrong Email or Password!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      })
  }
  return (
    <div className='row'>
      <div className='col-9'>
        <img src={Doctors} alt='' width='950px' height='600px' />
      </div>
      <div className='col-3 '>
        <div style={{ marginTop: '160px' }}>
          <div style={{ marginLeft: '40px', marginBottom: '20px' }}>
            {/* <img src={require('../../logo.png')} alt='' /> */}
            <h2>Win-Clinic</h2>
          </div>

          {/* <h4 style={{ marginLeft: '80px' }}>WELCOME</h4> */}
          <span style={{ fontSize: '14px' }}>
            Hello, Greeting! Please Sign In to Your Account!
          </span>
          <form onSubmit={setlogin}>
            <div className='mt-3' style={{ marginLeft: '30px' }}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-email'>
                  Email
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-email'
                  type={showEmail ? 'text' : 'email'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle email visibility'
                        onClick={handleClickShowEmail}
                        onMouseDown={handleMouseDownEmail}
                        edge='end'
                      >
                        {showEmail ? <EmailIcon /> : <EmailIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Email'
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
            </div>
            <div className='mt-2' style={{ marginLeft: '30px' }}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
            </div>
            <Button
              type='submit'
              variant='contained'
              sx={{
                m: 1,
                width: '29ch',
                marginLeft: '37px',
                marginTop: '20px'
              }}

            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
