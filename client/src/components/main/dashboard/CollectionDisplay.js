import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router'

import { userIsOwner } from '../../../helpers/auth'
import AtmosEdit from './AtmosEdit'

const CollectionDisplay = ({ handleCloudinary, userId, getUser, authenticated, loggedInUser, user }) => {

  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ openEdit,setOpenEdit ] = useState(false)
  const [ atmosToDaw, setAtmosToDaw ] = useState([])

  const navigate = useNavigate()
  
  const sendToDaw = (atmos) => {
    setAtmosToDaw(atmos)
    console.log(atmos)
    navigate('/daw')
  }
  const ModalContent = ({ atmo }) => {
    return (
      <AtmosEdit openEdit={openEdit} handleCloseModal={handleCloseModal} atmo={atmo} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser}/>
    )
  }

  const handleOpenEditModal = () => {
    setOpenEdit(true)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setOpenEdit(false)
    setIsModalOpen(false)
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
          console.log(userIsOwner(atmo))
          return (
            <div key={atmo.id}>
              {atmo.name}
              <button onClick={() => sendToDaw(atmo)}> To DAW</button>
              <button onClick={() => handleDeleteFromLibrary(atmo)}> Remove From Library</button>
              {userIsOwner(atmo) &&
                <>
                  <button onClick={() => handleOpenEditModal(atmo)}>Edit</button>
                  <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Example Modal"
                  >
                    <ModalContent atmo={atmo}/>
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