import { authenticated } from '../../../helpers/auth'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosForm from './AtmosForm'


const AtmosEdit = ({ userId, openEdit, atmo, handleCloseModal, handleCloudinary,getUser }) => {

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
    setAtmos(atmo)
    setFormFields(atmo)
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formatted = { ...formFields, owner: formFields.owner.id, tags: formFields.tags.map( tag => tag.id ) } 
      await authenticated.put(`/api/atmospheres/${atmo.id}/`, formatted)
      getUser()
      handleCloseModal()
    } catch (error) {
      console.log(error.response.data.detail.tags[0].tag)
      setAtmosError(error.response.data.detail.tags[0].tag)
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
      setAtmosError(error.response.data.detail.tag)
    }
  }
  console.log(atmos)
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
      getUser={getUser}
      handleCloseModal={handleCloseModal}
    />
  )
}

export default AtmosEdit