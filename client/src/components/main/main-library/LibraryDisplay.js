import ViewAtmos from './ViewAtmos'
import { useNavigate } from 'react-router'
import Error from '../../common/Error'
import { authenticated, loggedInUser } from '../../../helpers/auth'

const LibraryDisplay = ({ getUser, user, getAtmos, displayedAtmos, atmosError, setDisplayedAtmos }) => {

  const navigate = useNavigate()

  const addToLibrary = async (atmos) => {
    const data = { user_library: [atmos.id] }
    try {
      await authenticated.put(`/api/users/${loggedInUser()}/user_library/`, data)
      getAtmos()
      getUser()
    } catch (error) {
      console.log(error)
    }
  }


  console.log(user)
  const sortAtmos = (e) => {
    const openedUp = displayedAtmos.flat()
    if (e === 'Most Recent') {
      const timeModified = openedUp.map(atmo => {
        return { ...atmo, date_created: atmo.date_created.replace('T', ('_')).replace('Z', ('')) }
      })

      const dateSorted = timeModified.sort((a, b) => b.date_created.localeCompare(a.date_created))
      setDisplayedAtmos(dateSorted)
    } else if (e === 'Most Popular') {
      const popSorted = [...openedUp.sort((a, b) => b.put_in_library.length - a.put_in_library.length)]
      setDisplayedAtmos(popSorted)
    }
  }
  const sendToDaw = (atmos) => {
    localStorage.setItem('DAW-ITEM', JSON.stringify(atmos))
    navigate('/daw')
  }
  
  return (
    <>
      <section className='tile-display'>
        <div className='filters'>
          <select onChange={(e) => sortAtmos(e.target.value)}>
            <option > Filter</option>
            <option > Most Recent</option>
            <option > Most Popular</option>
          </select>
        </div>
        <div className='tile-display'>
          {displayedAtmos.length > 0 ?
            displayedAtmos.map(atmos => {
              return (
                <div key={atmos.id} className='atmo-tile'>
                  <div className='tile-picture' style={{ backgroundImage: `url(${atmos.picture})` }}>
                    <div className='library-buttons'>
                      {user &&
                        <div className={user.user_library.find(userAtmo => userAtmo.id === atmos.id) ?
                          'tick'
                          :
                          'add-button'} onClick={() => addToLibrary(atmos)}></div>
                      }
                      <button className='to-daw-button'onClick={() => sendToDaw(atmos)}> </button>
                    </div>
                    < ViewAtmos atmos={atmos} />
                  </div>
                  <p> name: {atmos.name} </p>
                  <div className='info-block'>
                    <p> creator: {atmos.owner.username}</p>
                    <p className='added-to'> added to {atmos.put_in_library.length} {atmos.put_in_library.length === 1 ? 'collection' : 'collections'} </p>
                  </div>
                  {/* <p> Tags: {atmos.tags.length} </p> */}
                </div>
              )
            })
            :
            
            <h6 className="no-atmos display-6"> No Atmospheres </h6>
          }
          {atmosError && <Error error={atmosError} />}
        </div>

      </section>

    </>
  )
}

export default LibraryDisplay