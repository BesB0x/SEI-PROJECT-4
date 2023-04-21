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

  console.log(formFields)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post('/api/atmospheres/', formFields)
      getUser()
      handleCloseModal()
    } catch (error) {
      console.log('error->',error.response.data.detail)
      // setAtmosError(error.response.data.detail.tags.tag[0])
    }
  }

  return (
    <AtmosForm
      title={'Create New Atmosphere'}
      setFormFields={setFormFields}
      formFields={formFields}
      setUserTag={setUserTag}
      handleSubmit={handleSubmit}
      tags={tags}
      handleCloudinary={handleCloudinary}
      atmosError={atmosError}
      setAtmosError={setAtmosError}
      userTag={userTag}
      authenticated={authenticated}
      setTags={setTags}
      handleCloseModal={handleCloseModal}
    />
  )
}

export default AtmosNew