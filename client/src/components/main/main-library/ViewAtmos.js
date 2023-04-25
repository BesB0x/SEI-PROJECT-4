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
      <div className='play-button' onClick={() => setToggler(!toggler)}>
      </div>
      <FsLightbox
        toggler={toggler}
        sources={[
          atmos.picture
        ]}
        onOpen={playAudio}
        onClose={stopAudio}
      />
    </>
  )
}

export default ViewAtmos