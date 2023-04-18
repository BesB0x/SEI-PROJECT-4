import { authenticated } from '../../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosForm from './AtmosForm'


const AtmosEdit = ({ userId,handleCloudinary,getUser }) => {

  const [formFields, setFormFields] = useState({
    name: '',
    tags: [],
    picture: '',
    audio: '',
  })
  const [tags, setTags] = useState([])
  const [userTag, setUserTag] = useState('')
  const [atmosError, setAtmosError] = useState('')

  const navigate = useNavigate()

  const audioPreset = 'gee4hwat'
  const picturePreset = 'fzakjvwm'

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await authenticated.get('/api/tags/')
        // console.log(data)
        setTags(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTags()
  }, [])

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setAtmosError('')
  }

  const handleTagChange = (e) => {
    setUserTag(e.target.value)
  }

  const submitTag = async (e) => {
    e.preventDefault()
    try {
      console.log(userTag)
      setFormFields({ ...formFields, tags: [...formFields.tags, userTag] })
      await authenticated.post('api/tags/', { tag: userTag })
      const { data } = await authenticated.get('api/tags/')
      setTags(data)
      setUserTag('')
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddTag = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    // formFields.tags.append(e.target.name)
    setFormFields({ ...formFields, tags: [...formFields.tags, e.target.name] })
  }
  console.log(formFields)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await authenticated.post('/api/atmospheres/', formFields)
      await authenticated.put(`/api/users/${userId}/user_library`, formFields)
      getUser()
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setAtmosError(error.message)
    }
  }
  return (
    <AtmosForm 
      setFormFields={setFormFields}
      formFields={formFields}
      setUserTag={setUserTag}
      handleSubmit={handleSubmit}
      submitTag={submitTag}
      tags={tags}
    />
  )
  // return (
  //   <main className='form-page'>
  //     <Container >
  //       <Row>
  //         <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
  //           <h1> Create An Atmosphere </h1>
  //           {/* name */}
  //           <label htmlFor='name'>Name</label>
  //           <input placeholder='name' type='text' name='name' onChange={handleChange} value={formFields.name} />
  //           {/* Tags */}
  //           <label htmlFor='tags'>Tags</label>
  //           <input type='tags' name='tags' onChange={handleTagChange} />
  //           <button onClick={submitTag} > Add Tag</button>
  //           {tags && tags.map((tag, i) => {
  //             return (
  //               <button className='tag-button' key={i} onClick={handleAddTag} name={tag.tag}> {tag.tag} </button>
  //             )
  //           })}
  //           {/* Audio */}
  //           <label htmlFor='audio'>Audio</label>
  //           <input type='file' onChange={(e) => handleCloudinary(e, audioPreset, 'audio')} />
  //           {/* Picture */}
  //           <label htmlFor='passwordConfirmation'>Picture</label>
  //           <input type='file' onChange={(e) => handleCloudinary(e, picturePreset, 'picture')} />
  //           <button>Create</button>
  //           {atmosError && <h6 className='error-message'> {atmosError} </h6>}
  //         </Col>
  //       </Row>
  //     </Container>
  //   </main>
  // )
}

export default AtmosEdit