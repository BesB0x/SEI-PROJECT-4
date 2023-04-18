import { userIsOwner } from '../../../helpers/auth'
import { useEffect, useState } from 'react'

const CollectionDisplay = ({ getUser, authenticated, loggedInUser, user }) => {

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
      {user ?
        user.user_library.map(atmo => {
          return (
            <div key={atmo.id}>
              {atmo.name}
              <button> To DAW</button>
              <button onClick={() => handleDeleteFromLibrary(atmo)}> Remove From Library</button>
              {userIsOwner &&
                <>
                  <button>Edit</button>
                </>
              }
            </div>
          )
        })
        :
        <h3> No Atmos!</h3>
      }
    </section>

  )
}

export default CollectionDisplay