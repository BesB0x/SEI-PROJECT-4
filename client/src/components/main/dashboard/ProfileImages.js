import axios from 'axios'

const ProfileImages = ({ handleCloudinary, user, setUserError, userId, getUser, authenticated }) => {


  const profilePicPreset = 'vi1ub8go'
  const coverPhotoPreset = 'zayy9z7x'
  
  return (
    <div className='profile-pic'>
      {user.profile_image ? <img src={user.profile_image} /> : <> Add a Profile Image Below </>}
      <label> Profile Pic</label>
      <input type='file' onChange={(e) => handleCloudinary(e,profilePicPreset, 'profile_image')} />
      <label> Cover Photo </label>
      <input type='file' onChange={(e) => handleCloudinary(e,coverPhotoPreset,'cover_photo')}/>
    </div>
  )
}

export default ProfileImages