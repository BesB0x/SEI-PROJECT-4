import { authenticated } from '../../../helpers/auth'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosForm from './AtmosForm'


const AtmosEdit = ({ openEdit, atmo,userId, handleCloseModal, handleCloudinary,getUser }) => {

  const [formFields, setFormFields] = useState({
    name: '',
    tags: [],
    picture: '',
    audio: '',
  })
  const [tags, setTags] = useState([])
  const [userTag, setUserTag] = useState('')
  const [ atmos,setAtmos ] = useState([])
  const [atmosError, setAtmosError] = useState('')

  const navigate = useNavigate() 

  console.log('atmo->',formFields)
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
    setAtmos(atmo)
    setFormFields(atmo)
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    handleCloseModal()
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

  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      handleCloseModal()
      console.log('delete')
      await authenticated.delete(`api/atmospheres/${atmo.id}/`)
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AtmosForm 
      title={'Edit Atmosphere'}
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
      openEdit={openEdit}
      handleDelete={handleDelete}
      
    />
  )
}

export default AtmosEdit