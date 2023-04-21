import { useEffect, useState, useCallback } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Library from './components/main/main-library/Library'
import AtmosNew from './components/main/dashboard/AtmosNew'
import Collection from './components/main/dashboard/Dashboard'
import PageNavBar from './components/common/PageNavBar'
import PageNotFound from './components/common/PageNotFound'
import { loggedInUser,authenticated } from './helpers/auth'

const App = () => {

  const [ user, setUser] = useState('')
  const [ userError, setUserError ] = useState('')



  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`api/users/${loggedInUser()}/`)
      setUser({ ...data })
    } catch (error) {
      console.log(error)
      setUserError(error.message)
    }
  })

  return (
    <BrowserRouter>
      <PageNavBar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path = '/login' element={<Login />}/>
        <Route path= '/atmos' element={<AtmosNew />} />
        <Route path= '/' element={<Library user={user} getUser={getUser} />} />
        <Route path= '/collection' element={<Collection user={user} getUser={getUser}/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
