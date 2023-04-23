import * as Tone from 'tone'
import { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'


const Daw = () => {
  const atmosphere = JSON.parse(localStorage.getItem('DAW-ITEM'))

  // NODES
  const [player, setPlayer] = useState(null)
  const [gain, setGain] = useState(null)
  const [delayGain, setDelayGain] = useState(null)

  // Delay State
  const [initialDelay, setInitialDelay] = useState(null)
  const [leftDelay, setLeftDelay] = useState(null)
  const [rightDelay, setRightDelay] = useState(null)
  const [delayLFO, setDelayLFO] = useState(null)
  const [feedback, setFeedback] = useState('')



  // CHECKS
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // SLIDER VALUES
  const [volume, setVolume] = useState(0)
  const [delayWet, setDelayWet] = useState(0)
  const [movement, setMovemement] = useState(0)



  useEffect(() => {

    const gain = new Tone.Gain({
      gain: 6,
    }).toDestination()

    const delayGain = new Tone.Gain({
      gain: 0,
    }).toDestination()

    // ! Reverb

    const reverb = new Tone.Reverb().toDestination()

    // ! Delay

    const delay = (channel) => {

      const firstDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: 0.1,
        maxDelayTime: 10 ,
      }
      )
      setInitialDelay(firstDelay)

      const secondDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: 0.3,
        maxDelayTime: 10 ,
      }
      )
      const thirdDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: 0.3,
        maxDelayTime: 10 ,
      }
      )

      // PATCH BAY
      channel.connect(firstDelay)


      firstDelay.connect(secondDelay)
      firstDelay.connect(thirdDelay)


      // CREATE TREE
      let count = 0
      const startTime = 0.3 * 2
      let repeatTime
      const lfo = new Tone.LFO({
        frequency: 0, // set the frequency of the LFO
        type: 'sine', // set the waveform of the LFO
        min: -1, // set the minimum value for the modulation
        max: 1, // set the maximum value for the modulation
      }).start()
      setDelayLFO(lfo)

      if (count < 4) {

        let leftBranch = secondDelay
        let roomSize = 0
        const reverb = new Tone.Freeverb({
          roomSize: roomSize,
          wet: 0.3,
        }
        )
        for (let i = 0; i < 2; i++) {
          const pan = new Tone.Panner3D({
            positionX: -1,
            positionY: -1,
            positionZ: 1,
          })
          repeatTime = startTime + 2
          roomSize < 1 ? roomSize = roomSize + 0.2 : roomSize = 0
          const additionalDelay = new Tone.PingPongDelay({
            feedback: 0.1,
            delayTime: 0.8,
            maxDelayTime: 10 ,
          })
          setLeftDelay(additionalDelay)
          count++
          leftBranch.chain(additionalDelay, pan, delayGain)
          // lfo.connect(pan.positionX)
          leftBranch = additionalDelay // update the reference to the latest delay node
        }

        // create two more delays and connect them to the thirdDelay
        let rightBranch = thirdDelay
        for (let i = 0; i < 2; i++) {
          const pan = new Tone.Panner3D({
            positionX: 1,
            positionY: 1,
            positionZ: -1,
          })

          const additionalDelay = new Tone.PingPongDelay({
            feedback: 0.1,
            delayTime: 0.8,
            maxDelayTime: 10 ,
          })
          setRightDelay(additionalDelay)
          console.log(additionalDelay.delayTime.value)
          count++
          rightBranch.chain(additionalDelay, pan, reverb, delayGain)
          rightBranch = additionalDelay // update the reference to the latest delay node
        }
      }
    }





    const player = new Tone.Player({
      url: `${atmosphere.audio}`,
      loop: true,
      loopStart: 0,
      loopEnd: 10,
      playbackRate: 1,
      // reverse: true,
      onload: () => {
        setIsLoaded(true)
      },
      onerror: () => {
        console.error('Error loading audio file')
      },
    })

    // ! PATCH BAY

    player.connect(gain)
    delay(player)
    // harmPitch.connect(gain)

    setGain(gain)
    setDelayGain(delayGain)
    setPlayer(player)


  }, [atmosphere.audio])





  // UI

  const handlePlay = () => {
    if (isLoaded) {
      setIsPlaying(true)
      gain.gain.value = 0.5
      setVolume(0.5)
      Tone.start()
      player.start()
    } else {
      console.warn('Audio file not loaded')
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    if (player) {
      gain.gain.rampTo(0, 3)
      player.stop()
      setVolume(0)
    }
  }

  // ! SLIDERS
  // Main Gain
  const handleVolume = (newValue) => {
    setVolume(newValue)
    gain.gain.value = volume
  }


  // Delay Sliders
  const handleDelayWet = (newValue) => {
    setDelayWet(newValue)
    delayGain.gain.value = delayWet
  }
  const handleMovement = (newValue) => {
    setMovemement(newValue)
    delayLFO.frequency.value = movement
  }

  const handleFeedback = (newValue) => {
    setFeedback(newValue)
    initialDelay.feedback.value = feedback
    rightDelay.feedback.value = feedback
    leftDelay.feedback.value = feedback
    initialDelay.maxDelayTime = feedback
    rightDelay.maxDelayTime = feedback
    leftDelay.maxDelayTime = feedback
  }

  const harmonyOne = () => {
    console.log(leftDelay.delayTime.value, rightDelay.delayTime.value)
    leftDelay.delayTime.value = 0.2
    rightDelay.delayTime.value = 0.8
  }

  const harmonyTwo = () => {
    console.log(leftDelay.delayTime.value, rightDelay.delayTime.value)
    leftDelay.delayTime.value = 0.8
    rightDelay.delayTime.value = 0.2
  }

  const harmonyThree = () => {
    console.log(leftDelay.delayTime.value, rightDelay.delayTime.value)
    leftDelay.delayTime.setValueAtTime = (2.5, Tone.now())
    rightDelay.delayTime.value = (1, Tone.now())
  }

  //  Harmonizer Sliders




  return (
    <main>
      <div className="daw-picture" style={{ backgroundImage: `url(${atmosphere.picture})` }}>
        <section className="controls">
          <div className='volume-play-stop'>
            <button className='daw-play-button' onClick={handlePlay} disabled={isPlaying || !isLoaded}></button>
            <button className='stop-button' onClick={handleStop} disabled={!isPlaying}></button>
            <label id="slider-label">volume</label>
            <ReactSlider
              ariaLabelledby="slider-label"
              className="slider"
              thumbClassName="thumb"
              trackClassName="example-track"
              value={volume}
              onChange={handleVolume}
              max={5}
              step={0.1}
              min={0}
            />
          </div>
          <div className='effects'>
            <div className='delay'>
              <label id="slider-label">Delay</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={delayWet}
                onChange={handleDelayWet}
                min={0}
                max={5}
                step={0.1}
              />
              <label id="slider-label">Movement</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={movement}
                onChange={handleMovement}
                max={50}
                min={0}
                step={0.1}
              />
              <button onClick={harmonyOne}> 1 </button>
              <button onClick={harmonyTwo}> 2 </button>
              <button onClick={harmonyThree}> 3 </button>
              <label id="slider-label">Intensity</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={feedback}
                onChange={handleFeedback}
                max={1}
                min={0}
                step={0.01}
              />

            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Daw
