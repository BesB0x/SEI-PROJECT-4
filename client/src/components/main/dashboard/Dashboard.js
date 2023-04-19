import axios from 'axios'

import ReactModal from 'react-modal'

import CollectionDisplay from './CollectionDisplay'
import { authenticated, loggedInUser } from '../../../helpers/auth'
import ProfileImages from './ProfileImages'
import AtmosNew from './AtmosNew'

import { useCallback, useEffect, useState } from 'react'



const Collection = () => {

  const [user, setUser] = useState('')
  const [userError, setUserError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userId = loggedInUser()


  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`api/users/${userId}/`)
      setUser({ ...data })
    } catch (error) {
      console.log(error)
      setUserError(error.message)
    }
  })

  useEffect(() => {
    getUser()
  }, [])

  // Modal Form  

  const ModalContent = () => {
    return (
      <AtmosNew handleCloseModal={handleCloseModal} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser}/>
    )
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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

  return (
    <main className="collection-db">
      {/* {user ? */}
      <div className="user-dashboard">
        <section className="dashboard-top" style={{ backgroundImage: `url(${user.cover_photo})` }}  >
          <ProfileImages handleCloudinary={handleCloudinary} user={user} setUserError={setUserError} userId={userId} getUser={getUser} authenticated={authenticated} />
          <div className='username'>
            <h2> Name</h2>
            <p> {user.username}</p>
            {/* <button> Edit Profile</button> */}
          </div>
          <div className='create-atmo-button'>
            <div>
              <button onClick={handleOpenModal}>Create New Atmosphere</button>
              <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
              >
                <ModalContent />
              </ReactModal>
            </div>
          </div>
        </section>
        <CollectionDisplay userId={userId} handleCloudinary={handleCloudinary} getUser={getUser} authenticated={authenticated} loggedInUser={loggedInUser} user={user} />
      </div>
      {/* :
        <h2> Loading</h2> */}
      {/* } */}
    </main>

  )
}

export default Collection