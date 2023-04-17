import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Library from './components/main/Library'
import AtmosForm from './components/main/AtmosForm'
import PageNavBar from './components/common/PageNavBar'
import PageNotFound from './components/common/PageNotFound'

const App = () => {

  const [ user, setUser] = useState([])
  const [ userError, setUserError ] = useState('')

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/users/${loggedInUser}`) 
  //       setUser({ ...data })
  //     } catch (error) {
  //       console.log(error)
  //       setUserError(error)
  //     }
  //   }
  //   getUser()
  // }, [])

  return (
    <BrowserRouter>
      <PageNavBar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path = '/login' element={<Login />}/>
        <Route path= '/atmos' element={<AtmosForm />} />
        <Route path= '/library' element={<Library />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
