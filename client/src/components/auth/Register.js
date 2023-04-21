import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState( {
    username: '',
    email: '',
    password: '',
    password_confirmation: '', 
  })
  const [ error, setError ] = useState('')

  const handleChange = (e) => {
    setFormFields( { ...formFields, [e.target.name]: e.target.value } )
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/register/', formFields)
      console.log('data->',data)
      navigate('/login')
    } catch (error) {
      console.log(error.response)
      setError(error.response)
    }

  }
  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
            <h1> Register </h1>
            {/* Username */}
            <label htmlFor='username'>Username</label>
            <input placeholder='Username' type='text' name='username' onChange={handleChange} value={formFields.username} />
            { error && <h6 className='error-message'> {error.data.detail.username} </h6>}
            {/* Email */}
            <label htmlFor='email'>Email</label>
            <input placeholder='Email' type='email' name='email' onChange={handleChange} value={formFields.email}/>
            { error && <h6 className='error-message'> {error.data.detail.email} </h6>}
            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input placeholder='Password' type='password' name='password' onChange={handleChange} value={formFields.password}/>
            { error && <h6 className='error-message'> {error.data.detail.password} </h6>}
            {/* Password Confirmation */}
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input placeholder='Password Confirmation' type='password' name='password_confirmation' onChange={handleChange}value={formFields.password_confirmation} />
            { error && <h6 className='error-message'> {error.data.detail.password} </h6>}
            <button>Register</button>
            { error.status === 500 && <h6 className='error-message'> Please try again later! </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Register