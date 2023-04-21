import axios from 'axios'

import ReactModal from 'react-modal'

import CollectionDisplay from './CollectionDisplay'
import { authenticated, loggedInUser, removeToken } from '../../../helpers/auth'
import ProfileImages from './ProfileImages'
import AtmosNew from './AtmosNew'

import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Collection = ({ getUser,user }) => {

  const [userError, setUserError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userId = loggedInUser()
  const navigate = useNavigate()


  useEffect(() => {
    getUser()
  }, [])

  // Modal Form  

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      transform: 'translate(-50%, -50%) scale(0.75)',
    },
  }

  const ModalContent = () => {
    return (
      <AtmosNew handleCloseModal={handleCloseModal} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser}/>
    )
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  // Uploading media
  const handleCloudinary = async (e, uploadPreset, keyName) => {
    e.preventDefault()
    const cloudName = 'detjuq0lu'
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      console.log(data)
      await authenticated.put(`/api/users/${userId}/`, { [keyName]: data.secure_url })
      getUser()
    } catch (err) {
      console.log(err)
      setUserError(err.message)
    }
  }

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <main className="collection" style={{ backgroundImage: `url(${user.cover_photo})` }}>
      <div className="user-dashboard">
        <section className="dashboard-top"   >
          <div className='profile-pic-box'> 
            <ProfileImages handleCloudinary={handleCloudinary} user={user} setUserError={setUserError} userId={userId} getUser={getUser} authenticated={authenticated} />
          </div>
          <div className='username'>
            <h3> {user.username}</h3>
            <div className='logout-button' onClick={handleLogout}> Logout </div>
          </div>
          <div className='create-atmo-button'>
            <div>
              <button onClick={handleOpenModal}>Create New Atmosphere</button>
              <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="New Atmosphere Modal"
                style={customStyles}
              >
                <ModalContent />
              </ReactModal>
            </div>
          </div>
        </section>
        <CollectionDisplay  customStyles={customStyles }userId={userId} handleCloudinary={handleCloudinary} getUser={getUser} authenticated={authenticated} loggedInUser={loggedInUser} user={user} />
      </div>
    </main>

  )
}

export default Collection