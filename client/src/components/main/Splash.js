import logo from '../../assets/logo-cl.png'
import collection from '../../assets/cltn-cl.png'
import daw from '../../assets/to-daw-cl.png'
import { useNavigate } from 'react-router-dom'


const Splash = () => {

  const navigate = useNavigate()
  const handleSend = () => {
    navigate('/library')
  }
  return (
    <main className="splash">
      <h1 className='appear-first'> Welcome to Atmos</h1>
      <p className='appear-first'> Atmos is a website for creating and experimenting with atmospheres.</p>
      <div className='appear-second'>
        <img src={logo} />
        <p> Explore all atmospheres in the Library, and add your favourites to your collection</p>
      </div>
      <div className='appear-third'>
        <img src={collection} />
        <p> Create your own atmospheres, access your collection, and start experimenting with your atmospheres in your dashboard</p>
      </div>
      <div className='appear-fourth'>
        <img src={daw} />
        <p> See where our software can take you! </p>
      </div>
      <button onClick={handleSend}className='appear-fifth'> Enter </button>
    </main>
  )
}

export default Splash