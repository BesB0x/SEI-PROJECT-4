import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'


function ViewAtmos({ atmos }) {

  const [toggler, setToggler] = useState(false)


  const audio = new Audio(atmos.audio)

  const playAudio = () => {
    audio.play()

  }

  const stopAudio = () => {
    audio.currentTime = 0
    audio.pause()
  }
  return (
    <>
      <button onClick={() => setToggler(!toggler)}>
        View
      </button>
      <FsLightbox
        toggler={toggler}
        sources={[
          atmos.picture
          // 'https://res.cloudinary.com/detjuq0lu/image/upload/v1681894761/ATMOS%20-%20PROFILE%20PIC/hnh8opf581ughzf0gfgo.jpg',
          // 'https://i.imgur.com/fsyrScY.jpg'
        ]}
        onOpen={playAudio}
        onClose={stopAudio}
      />
    </>
  )
}

export default ViewAtmos