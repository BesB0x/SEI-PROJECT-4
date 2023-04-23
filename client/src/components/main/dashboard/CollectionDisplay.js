import { useState } from 'react'
import { useNavigate } from 'react-router'
// import { useHistory } from 'react-router-dom'

import { userIsOwner } from '../../../helpers/auth'
import AtmosEdit from './AtmosEdit'
import ViewAtmos from '../../common/ViewAtmos'
import ModalEditComponent from './ModalEditComponent'

const CollectionDisplay = ({ customStyles, handleCloudinary, userId, getUser, authenticated, loggedInUser, user }) => {


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [atmosToDaw, setAtmosToDaw] = useState([])

  const navigate = useNavigate()
  // const history = useHistory()

  const sendToDaw = (atmos) => {
    localStorage.setItem('DAW-ITEM', JSON.stringify(atmos))
    // history.push(atmos)
    // console.log(history)
    navigate('/daw')
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

  return (
    <section className="tile-display">
      {user &&
        user.user_library.map(atmo => {
          return (
            <div key={atmo.id} className='atmo-tile' >
              <div className='tile-picture' style={{ backgroundImage: `url(${atmo.picture})` }}>
                <div className='library-buttons'>
                  { !userIsOwner(atmo) && <div className='remove-button' onClick={() => handleDeleteFromLibrary(atmo)}></div>}
                  {userIsOwner(atmo) &&
                    <ModalEditComponent isModelOpen={isModalOpen} customStyles={customStyles} atmo={atmo} userId={userId} handleCloudinary={handleCloudinary} getUser={getUser}/>
                  }
                  <button className='to-daw-button'onClick={() => sendToDaw(atmo)}> </button>
                </div>
                < ViewAtmos atmos={atmo} />
              </div>
              <div className='below-pic'>
                <p>
                  {atmo.name}
                </p>
              </div>
            </div>
          )
        })
      }
    </section>

  )
}

export default CollectionDisplay