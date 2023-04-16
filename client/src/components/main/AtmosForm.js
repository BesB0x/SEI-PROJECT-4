import { authenticated } from '../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const AtmosForm = () => {

  const [ formFields,setFormFields ] = useState( {
    name: '',
    tags: [],
    picture: '',
    audio: '',
  })
  const [ tags,setTags ] = useState([])
  const [ atmosError,setAtmosError ] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const getTags = async() => {
      try {
        const { data } = await authenticated.get('/api/tags/')
        console.log(data)
        setTags(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTags()
  }, [])

  const handleAddTag = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    formFields.tags.append(e.target.name)
    // setFormFields({ ...formFields, tags: e.target.name })
  }

  useEffect(() => {
    console.log(formFields)
  }, [formFields])

  const handleChange = (e) => {
    setFormFields( { ...formFields, [e.target.name]: e.target.value })
    setAtmosError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await authenticated.post('/api/atmospheres/', formFields)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setAtmosError(error.message)
    }
  }

  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
            <h1> Create An Atmosphere </h1>
            {/* name */}
            <label htmlFor='name'>Name</label>
            <input placeholder='name' type='text' name='name' onChange={handleChange} value={formFields.name} />
            {/* Tags */}
            <label htmlFor='tags'>Tags</label>
            <input placeholder= { formFields.tags.map(tag => tag)} type='tags' name='tags' onChange={handleChange} value={formFields.tags} />
            { tags && tags.map( (tag,i) => {
              console.log(tag)
              return (
                <button className= 'tag-button' key={i} onClick={handleAddTag} name={tag.tag}> {tag.tag} </button>
              )
            })}
            {/* Audio */}
            <label htmlFor='audio'>Audio</label>
            <input placeholder='audio' type='audio' name='audio' onChange={handleChange} value={formFields.audio} />
            {/* Picture */}
            <label htmlFor='passwordConfirmation'>Picture</label>
            <input placeholder='picture' type='password' name='picture' onChange={handleChange} value={formFields.picture} />
            <button>Create</button>
            {atmosError && <h6 className='error-message'> {atmosError} </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default AtmosForm