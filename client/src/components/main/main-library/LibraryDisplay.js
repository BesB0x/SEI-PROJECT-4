import ViewAtmos from '../../common/ViewAtmos'
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

      <section className='tile-display'>
        {displayedAtmos.map(atmos => {
          return (
            <div key={atmos.id} className='atmo-tile'>
              <div className='tile-picture' style={{ backgroundImage: `url(${atmos.picture})` }}>

                <div className='add-button' onClick={() => addToLibrary(atmos)}></div>
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
        }
        {atmosError && <Error error={atmosError} />}

      </section>

    </>
  )
}

export default LibraryDisplay