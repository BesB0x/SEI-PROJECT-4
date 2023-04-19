import ViewAtmos from './ViewAtmos'
import Error from '../../common/Error'
import { authenticated, loggedInUser } from '../../../helpers/auth'

const LibraryDisplay = ({ getAtmos, displayedAtmos, atmosError }) => {

  const addToLibrary = async (atmos) => {
    const data = { user_library: [atmos.id] }
    try {
      await authenticated.put(`/api/users/${loggedInUser()}/user_library/`, data)
      getAtmos()
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <section className='atmos-wrapper'>
        {displayedAtmos.map(atmos => {
          return (
            <div key={atmos.id} className='atmos-tile'>
              <div>
                <button className='add-button' onClick={() => addToLibrary(atmos)}> Add to Collection</button>
                < ViewAtmos atmos={atmos}/>
              </div>
              <p> name: {atmos.name} </p>
              <p> Creator: {atmos.owner.username}</p>
              <p> added to {atmos.put_in_library.length} {atmos.put_in_library.length === 1 ? 'collection' : 'collections'} </p>
              {/* <p> Tags: {atmos.tags.length} </p> */}
            </div>
          )
        })
        }
        {atmosError && <Error error={atmosError} />}

      </section>

    </>
  )
}

export default LibraryDisplay