import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'

function ViewAtmos() {
  // To open the lightbox change the value of the "toggler" prop.
  const [toggler, setToggler] = useState(false)

  const playAudio = () => {
    console.log('play')
  }

  const stopAudio = () => {
    console.log('stop')
  }
  return (
    <>
      <button onClick={() => setToggler(!toggler)}>
        Toggle Lightbox
      </button>
      <FsLightbox
        toggler={toggler}
        sources={[
          'https://i.imgur.com/fsyrScY.jpg'
        ]}
        onOpen={playAudio}
        onClose={stopAudio}
      />
    </>
  )
}

export default ViewAtmos