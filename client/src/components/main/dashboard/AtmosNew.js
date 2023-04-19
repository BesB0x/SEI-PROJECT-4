import { authenticated } from '../../../helpers/auth'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AtmosForm from './AtmosForm'


const AtmosNew = ({ userId, handleCloseModal, handleCloudinary, getUser }) => {

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
        setTags(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTags()
  }, [])


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

  console.log(formFields)

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleCloseModal()
    try {
      await authenticated.post('/api/atmospheres/', formFields)
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
      title={'Create New Atmosphere'}
      setFormFields={setFormFields}
      formFields={formFields}
      setUserTag={setUserTag}
      handleSubmit={handleSubmit}
      submitTag={submitTag}
      tags={tags}
      handleCloudinary={handleCloudinary}
      atmosError={atmosError}
      setAtmosError={setAtmosError}
      userTag={userTag}
      authenticated={authenticated}
      setTags={setTags}
    />
  )
}

export default AtmosNew