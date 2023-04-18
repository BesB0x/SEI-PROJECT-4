import axios from 'axios'
import CollectionDisplay from './CollectionDisplay'
import { authenticated,loggedInUser } from '../../../helpers/auth'

import { useCallback,useEffect,useState } from 'react'
import ProfileImages from './ProfileImages'


const Collection = () => {

  const [ user,setUser ] = useState([])
  const [ userError,setUserError ] = useState('')

  const userId = loggedInUser()

  const cloudName = 'detjuq0lu'

  const getUser = useCallback( async () => {
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

  console.log('dashboard', typeof user)

  const handleCloudinary = async (e, uploadPreset, keyName ) => {
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
      <div className="user-dashboard">
        <section className="dashboard-top" style= {{ backgroundImage: `url(${user.cover_photo})` }}  >
          
          <ProfileImages handleCloudinary={handleCloudinary} user={user} setUserError={setUserError} userId={userId} getUser={getUser} authenticated={authenticated}/>
          <div className='username'>
            <h2> Name</h2>
            <p> {user.username}</p>
            {/* <button> Edit Profile</button> */}
          </div>
          <div className='create-atmo-button'>
            <button> Create New Atmosphere</button>
          </div>
          
        </section>

        <CollectionDisplay getUser={getUser}authenticated={authenticated} loggedInUser={loggedInUser} user={user}/>
      </div>
    </main>

  )
}

export default Collection