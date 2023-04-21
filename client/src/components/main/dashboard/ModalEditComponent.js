import ReactModal from 'react-modal'
import { useState } from 'react'


import AtmosEdit from './AtmosEdit'

const ModalEditComponent = ( { customStyles,atmo,userId,handleCloudinary,getUser } ) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const ModalContent = ({ atmo }) => {
    return (
      <AtmosEdit openEdit={openEdit} handleCloseModal={handleCloseModal} atmo={atmo} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser} />
    )
  }

  const handleOpenEditModal = () => {
    setOpenEdit(true)
    setIsModalOpen(true)
  }

  const handleCloseModal = (e) => {
    setOpenEdit(false)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='edit-button' onClick={() => handleOpenEditModal(atmo)}></div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Atmosphere Modal"
        style={customStyles}
      >
        <ModalContent atmo={atmo} />
      </ReactModal>
    </>
  )
}

export default ModalEditComponent