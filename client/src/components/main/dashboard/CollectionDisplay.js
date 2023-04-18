import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router'

import { userIsOwner } from '../../../helpers/auth'
import AtmosEdit from './AtmosEdit'

const CollectionDisplay = ({ handleCloudinary, userId, getUser, authenticated, loggedInUser, user }) => {

  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ atmosToDaw, setAtmosToDaw ] = useState([])

  const navigate = useNavigate()
  
  const sendToDaw = (atmos) => {
    setAtmosToDaw(atmos)
    console.log(atmos)
    navigate('/daw')
  }
  const ModalContent = () => {
    return (
      <AtmosEdit userId={userId} handleCloudinary={handleCloudinary} getUser={getUser}/>
    )
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleEdit = () => {
    console.log('edit')
  }

  const handleDeleteFromLibrary = async (atmos) => {
    const data = { user_library: [atmos.id] }
    try {
      await authenticated.put(`/api/users/${loggedInUser()}/user_library/`, data)
      getUser()
    } catch (error) {
      console.log(error)
    }
  }
  console.log('collection', user)


  return (
    <section className="user-collection">
      {user &&
        user.user_library.map(atmo => {
          return (
            <div key={atmo.id}>
              {atmo.name}
              <button onClick={() => sendToDaw(atmo)}> To DAW</button>
              <button onClick={() => handleDeleteFromLibrary(atmo)}> Remove From Library</button>
              {userIsOwner &&
                <>
                  <button onClick={handleOpenModal}>Edit</button>
                  <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Example Modal"
                  >
                    <ModalContent />
                    <button onClick={handleCloseModal}>Save</button>
                  </ReactModal>
                </>
              }
            </div>
          )
        })
      }
    </section>

  )
}

export default CollectionDisplay