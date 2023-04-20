import { useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router'

import { userIsOwner } from '../../../helpers/auth'
import AtmosEdit from './AtmosEdit'
import ViewAtmos from '../../common/ViewAtmos'

const CollectionDisplay = ({ handleCloudinary, userId, getUser, authenticated, loggedInUser, user }) => {


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [atmosToDaw, setAtmosToDaw] = useState([])

  const navigate = useNavigate()

  const sendToDaw = (atmos) => {
    setAtmosToDaw(atmos)
    console.log(atmos)
    navigate('/daw')
  }
  const ModalContent = ({ atmo }) => {
    return (
      <AtmosEdit openEdit={openEdit} handleCloseModal={handleCloseModal} atmo={atmo} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser} />
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
  console.log('collection', user.user_library)

  return (
    <section className="tile-display">
      {user &&
        user.user_library.map(atmo => {
          console.log(userIsOwner(atmo))
          return (
            <div key={atmo.id} className='atmo-tile' >
              {/* < img src={atmo.picture} alt='atmosphere picture'/> */}
              <div className='tile-picture' style={{ backgroundImage: `url(${atmo.picture})` }}>
                <button className='daw-button' onClick={() => sendToDaw(atmo)}> To DAW</button>
                <div className='remove-button'onClick={() => handleDeleteFromLibrary(atmo)}></div>
                < ViewAtmos atmos={atmo} />
                {userIsOwner(atmo) &&
                  <>
                    <div className='edit-button' onClick={() => handleOpenEditModal(atmo)}></div>
                    <ReactModal
                      isOpen={isModalOpen}
                      onRequestClose={handleCloseModal}
                      contentLabel="Example Modal"
                    >
                      <ModalContent atmo={atmo} />
                      <button onClick={handleCloseModal}>Save</button>
                    </ReactModal>
                  </>
                }

              </div>
              <p>
                {atmo.name} 
              </p>
            </div>
          )
        })
      }
    </section>

  )
}

export default CollectionDisplay