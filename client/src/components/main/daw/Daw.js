import * as Tone from 'tone'
import { useState, useEffect, useRef } from 'react'
import ReactSlider from 'react-slider'

const Daw = () => {
  const atmosphere = JSON.parse(localStorage.getItem('DAW-ITEM'))

  // NODES
  const [player, setPlayer] = useState(null)
  const [gain, setGain] = useState(null)
  const [ delayGain, setDelayGain ] = useState(null)
  
  // CHECKS
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // SLIDER VALUES
  const [volume, setVolume] = useState(0)
  const [delayWet, setDelayWet] = useState(0)


  // CHAIN
  useEffect(() => {

    const gain = new Tone.Gain({
      gain: 0,
    }).toDestination()

    const delayGain = new Tone.Gain({
      gain: 0,
    }).toDestination()


    const delay = (player) => {
      const feedback = 0.1
      const time = 1

      const firstDelay = new Tone.FeedbackDelay({
        feedback: feedback,
        delayTime: time,
      }
      )

      const secondDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: time * 2 ,
      }
      )
      const thirdDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: time * 2,
      }
      )

      // PATCH BAY
      player.connect(firstDelay)

      firstDelay.connect(secondDelay)
      firstDelay.connect(thirdDelay)


      // CREATE TREE
      let count = 0
      const startTime = time * 2
      let repeatTime
      const lfo = new Tone.LFO({
        frequency: 1, // set the frequency of the LFO
        type: 'sine', // set the waveform of the LFO
        min: -1, // set the minimum value for the modulation
        max: 1, // set the maximum value for the modulation
      }).start()

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
          const additionalDelay = new Tone.FeedbackDelay({
            feedback: 0.1,
            delayTime: '4n',
          })
          count++
          leftBranch.chain(additionalDelay, pan, reverb, delayGain)
          lfo.connect(pan.positionY)
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

          const additionalDelay = new Tone.FeedbackDelay({
            feedback: 0.1,
            delayTime: '3n',
          })
          count++
          rightBranch.chain(additionalDelay, pan, reverb, delayGain)
          lfo.connect(pan.positionX)
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
      reverse: true,
      onload: () => {
        setIsLoaded(true)
      },
      onerror: () => {
        console.error('Error loading audio file')
      },
    }).connect(gain)

    setGain(gain)
    setDelayGain(delayGain)
    delay(player)
    setPlayer(player)
  }, [atmosphere.audio])


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

  // SLIDERS


  const handleVolume = (newValue) => {
    setVolume(newValue)
  }

  const handleGainAfterChange = () => {
    gain.gain.value = volume
  }

  const handleDelayWet = (newValue) => {
    setDelayWet(newValue)
  }

  const handleDelayWetAfterChange = () => {
    delayGain.gain.value = delayWet
  }


  // EFFECTS

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
              onAfterChange={handleGainAfterChange}
              max={5}
              step={0.1}
            />
          </div>
          <div className='sliders'>
            <label id="slider-label">Delay</label>
            <ReactSlider
              ariaLabelledby="slider-label"
              className="slider"
              thumbClassName="thumb"
              trackClassName="example-track"
              // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              value={delayWet}
              onChange={handleDelayWet}
              onAfterChange={handleDelayWetAfterChange}
              min={0}
              max={5}
              step={0.1}
            />
            {/* <label id="slider-label">Reverb</label>
            <ReactSlider
              ariaLabelledby="slider-label"
              className="slider"
              thumbClassName="thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              value={reverb}
              onChange={handleReverb}
              onAfterChange={handleSliderAfterChange}
            />
            <label id="slider-label">Space</label>
            <ReactSlider
              ariaLabelledby="slider-label"
              className="slider"
              thumbClassName="thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              value={volume}
              onChange={handleVolume}
              onAfterChange={handleSliderAfterChange}
            />
            <label id="slider-label">Time</label>
            <ReactSlider
              ariaLabelledby="slider-label"
              className="slider"
              thumbClassName="thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              value={volume}
              onChange={handleVolume}
              onAfterChange={handleSliderAfterChange}
            /> */}

          </div>
        </section>
      </div>
    </main>
  )
}

export default Daw
