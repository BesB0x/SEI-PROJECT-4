

const ProfileImages = ({ handleCloudinary, user }) => {


  const profilePicPreset = 'vi1ub8go'
  const coverPhotoPreset = 'zayy9z7x'
  
  return (
    <div className='profile-pic'>
      {user.profile_image ? <img src={user.profile_image} /> : <> Add a Profile Image Below </>}
      <div className="picture-buttons">
        <div>
          <label> Set Profile Pic</label>
          <input type='file' onChange={(e) => handleCloudinary(e,profilePicPreset, 'profile_image')} />
        </div>
        <div>
          <label> Set Cover Photo </label>
          <input type='file' onChange={(e) => handleCloudinary(e,coverPhotoPreset,'cover_photo')}/>
        </div>
      </div>
    </div>
  )
}

export default ProfileImages