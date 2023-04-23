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
  const [delayDos, setDelayDos] = useState(null)
  const [delayTres, setDelayTres] = useState(null)
  const [leftDelay, setLeftDelay] = useState(null)
  const [rightDelay, setRightDelay] = useState(null)
  const [delayLFO, setDelayLFO] = useState(null)
  const [feedback, setFeedback] = useState('')

  // Filter State
  const [filter, setFilter] = useState(null)
  const [ cutoff, setCutoff] = useState(20000)

  // Reverb state
  const [reverb, setReverb] = useState(null)
  const [dryWet, setDryWet] = useState(0)
  const [roomSize, setRoomSize] = useState(1)

  // CHECKS
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // SLIDER VALUES
  const [volume, setVolume] = useState(0)
  const [delayWet, setDelayWet] = useState(0)
  const [movement, setMovemement] = useState(0)



  useEffect(() => {
    const reverb = new Tone.Reverb({ wet: 0, decay: 10 }).toDestination()
    // ! Lowpass Filter
    const lowpass = new Tone.Filter({
      type: 'lowpass',
      frequency: 100, // set initial frequency to maximum
      rolloff: -12,// 12dB/octave rolloff
    }).toDestination()


    const gain = new Tone.Gain({
      gain: 6,
    }).chain(lowpass)

    const delayGain = new Tone.Gain({
      gain: 0,
    }).chain(reverb, lowpass)



    // ! Effect Chain

    const delay = (channel) => {

      const firstDelay = new Tone.FeedbackDelay({
        feedback: 0,
        delayTime: 1,
        maxDelay: 100,
      }
      )
      setInitialDelay(firstDelay)

      const secondDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: 1,
        maxDelay: 100,
      }
      )
      setDelayDos(secondDelay)
      const thirdDelay = new Tone.FeedbackDelay({
        feedback: 0.1,
        delayTime: 1,
        maxDelay: 100,
      }
      )
      setDelayTres(thirdDelay)

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
      console.log('lfo', lfo.frequency.value)
      setDelayLFO(lfo)

      if (count < 4) {

        let leftBranch = secondDelay
        let roomSize = 0.2
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
            maxDelay: 100,
          })
          setLeftDelay(additionalDelay)
          count++
          leftBranch.chain(additionalDelay, pan, reverb, delayGain)
          lfo.connect(pan.positionX)
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
            maxDelay: 100,
          })
          setRightDelay(additionalDelay)
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
      // reverse: true,
      onload: () => {
        setIsLoaded(true)
      },
      onerror: () => {
        console.error('Error loading audio file')
      },
    })



    player.chain(gain, reverb)
    delay(player)

    setGain(gain)
    setDelayGain(delayGain)
    setPlayer(player)
    setFilter(lowpass)
    setReverb(reverb)


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
    delayLFO.frequency.value = newValue
  }

  const handleFeedback = (newValue) => {
    setFeedback(newValue)
    initialDelay.feedback.value = feedback
    rightDelay.feedback.value = feedback
    leftDelay.feedback.value = feedback
  }

  const rhythmOne = () => {
    console.log(leftDelay.delayTime.value, rightDelay.delayTime.value)
    leftDelay.delayTime.value = 0.66666
    rightDelay.delayTime.value = 0.3333
  }

  const rhythmTwo = () => {
    leftDelay.delayTime.value = 1
    rightDelay.delayTime.value = 0.75
  }

  const rhythmThree = () => {
    leftDelay.delayTime.setValueAtTime = 0.9
    rightDelay.delayTime.value = 0.1
  }

  const rhythmFour = () => {
    leftDelay.delayTime.setValueAtTime = 0.9
    rightDelay.delayTime.value = 0.1
  }

  const rhythmFive = () => {
    leftDelay.delayTime.setValueAtTime = 0.9
    rightDelay.delayTime.value = 0.1
  }

  const rhythmSix = () => {
    leftDelay.delayTime.setValueAtTime = 0.9
    rightDelay.delayTime.value = 0.1
  }

  //  Reverb Sliders
  const handleDryWet = (newValue) => {
    console.log(reverb.wet.value)
    setDryWet(newValue)
    reverb.wet.value = dryWet
  }

  const handleRoomSize = (newValue) => {
    setRoomSize(newValue)
    reverb.decay = roomSize
  }

  // Filter Sliders

  const handleFilter = (newValue) => {
    setCutoff(newValue)
    filter.frequency.value = cutoff
  }



  return (
    <main>
      <div className="daw-picture" style={{ backgroundImage: `url(${atmosphere.picture})` }}>
        <section className="controls">

          {/* Play Stop Volume  */}
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
              max={2}
              step={0.1}
              min={0}
            />
          </div>
          {/* Effects */}

          <div className='effects'>

            {/* DELAY */}
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
                max={1}
                step={0.01}
              />
              <label id="slider-label">Movement</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={movement}
                onChange={handleMovement}
                max={1}
                min={0}
                step={0.01}
              />
              <button onClick={rhythmOne}> 1 </button>
              <button onClick={rhythmTwo}> 2 </button>
              <button onClick={rhythmThree}> 3 </button>
              <button onClick={rhythmFour}> 4 </button>
              <button onClick={rhythmFive}> 5 </button>
              <button onClick={rhythmSix}> 6 </button>
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
            {/* REVERB */}
            <div className='reverb'>
              <label id="slider-label">Amount</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={dryWet}
                onChange={handleDryWet}
                max={1}
                min={0}
                step={0.01}
              />
              <label id="slider-label">Size</label>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={roomSize}
                onChange={handleRoomSize}
                max={100}
                min={1}
                step={1}
              />
            </div>
            {/* Filters */}
            <div className='filter'>
              <ReactSlider
                ariaLabelledby="slider-label"
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={cutoff}
                onChange={handleFilter}
                max={20000}
                min={0}
                step={1}
              />
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Daw
