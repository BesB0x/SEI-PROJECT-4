import { useEffect, useState, useCallback } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Library from './components/main/main-library/Library'
import Splash from './components/main/Splash'
import Collection from './components/main/dashboard/Dashboard'
import Daw from './components/main/daw/Daw'
import PageNavBar from './components/common/PageNavBar'
import PageNotFound from './components/common/PageNotFound'
import { loggedInUser,authenticated } from './helpers/auth'

const App = () => {

  const [audio, setAudio ] = useState(null)
  const [ user, setUser] = useState('')
  const [ userError, setUserError ] = useState('')

  // const navigate = useNavigate()

  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`api/users/${loggedInUser()}/`)
      
      if (typeof data === 'object'){
        setUser({ ...data })
      } else {
        setUser('')
      }
    } catch (error) {
      console.log(error)
      setUserError(error.message)
    }
  })


  // const sendToDaw = (atmos) => {
  //   localStorage.setItem('DAW-ITEM', JSON.stringify(atmos))
  //   navigate('/daw')
  // }

  return (
    <BrowserRouter>
      <PageNavBar audio={audio} setAudio={setAudio}/>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path = '/login' element={<Login />}/>
        <Route path= '/' element={<Splash />} />
        <Route path= '/library' element={<Library user={user} getUser={getUser} />} />
        <Route path= '/collection' element={<Collection user={user} getUser={getUser}/>} />
        <Route path='/daw' element={<Daw audio={audio} setAudio={setAudio} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
