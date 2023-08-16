import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from 'axios'

import TagsOnForm from './TagsOnForm'

import { useState } from 'react'
import Spinner from '../../common/Spinner'


const AtmosForm = ({ getUser, handleCloseModal, handleDelete, openEdit, title, setFormFields, formFields, setUserTag, handleSubmit, tags, atmosError, setAtmosError, userTag, authenticated, setTags }) => {

  const audioPreset = 'gee4hwat'
  const picturePreset = 'fzakjvwm'

  const [tagError, setTagError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setAtmosError('')
  }

  const handleTagChange = (e) => {
    setUserTag(e.target.value)
    setTagError('')
  }

  console.log(formFields)


  const submitTag = async (e) => {
    e.preventDefault()
    try {
      const response = await authenticated.post('/api/tags/', { tag: userTag })
      const { data } = await authenticated.get('/api/tags/')
      setFormFields({ ...formFields, tags: [...formFields.tags, response.data] })
      setTags(data)
      setUserTag('')
    } catch (error) {
      console.log(error.response.data.detail)
      setTagError(error.response.data.detail.tag)
    }
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    if (!formFields.tags.some(t => t.tag === e.target.name)) {
      setFormFields({ ...formFields, tags: [...formFields.tags, { tag: e.target.name, id: e.target.id }] })
    } else {
      setFormFields({ ...formFields, tags: formFields.tags.filter(t => t.tag !== e.target.name) })
    }
  }

  const handleCloudinary = async (e, uploadPreset, keyName, setUploadingState) => {
    e.preventDefault()
    const cloudName = 'detjuq0lu'
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      setUploadingState(true)
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, formData)
      console.log(data)
      setFormFields({ ...formFields, [keyName]: data.secure_url })

    } catch (err) {
      console.log(err)
      setAtmosError(err.response.data)
    } finally {
      setUploadingState(false) // Stop the spinner
    }
  }

  const [uploadingAudio, setUploadingAudio] = useState(false)
  const [uploadingPicture, setUploadingPicture] = useState(false)

  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={(e) => handleSubmit(e)}>
            <h1> {title} </h1>
            {/* name */}
            <label htmlFor='name'>Name</label>
            <input className='name-input' placeholder='name' type='text' name='name' onChange={handleChange} value={formFields.name} />
            {/* Tags */}
            <label htmlFor='tags'>Tags</label>
            <div className='add-a-tag'>
              <input placeholder='add a tag' type='tags' name='tags' value={userTag} onChange={handleTagChange} />
              <button className='form-button' onClick={submitTag} > Add</button>
              {tagError && <p> {tagError} </p>}
              <p> or </p>
            </div>
            <div className='tags-display'>
              {tags && tags.map((tag, i) => {
                return (
                  <TagsOnForm formFields={formFields} key={i} i={i} tag={tag} handleAddTag={handleAddTag} />
                )
              })}
            </div>
            <div>
              {/* Audio */}
              <label htmlFor='audio'>Audio</label>
              <input type='file' onChange={(e) => handleCloudinary(e, audioPreset, 'audio', setUploadingAudio)} />
              {uploadingAudio &&
                  <p className='spinner'> uploading...</p>}
              {/* Picture */}
              <label htmlFor='passwordConfirmation'>Picture</label>
              <input type='file' onChange={(e) => handleCloudinary(e, picturePreset, 'picture', setUploadingPicture)} />
              {uploadingPicture &&
                  <p className='spinner'> uploading...</p>}
            </div>
            <div className='bottom-form-buttons'>
              {openEdit && <button className='form-button' onClick={handleDelete}> Delete </button>}
              <button disabled={formFields.audio && formFields.picture ? false : true} className='form-button' type='submit'>Create</button>
              <button className='form-button' onClick={(e) => handleCloseModal(e)}>Cancel</button>
            </div>
            {atmosError && <h6 className='error-message'> {atmosError} </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )

}

export default AtmosForm