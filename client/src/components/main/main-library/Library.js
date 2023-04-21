import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { isAuthenticated } from '../../../helpers/auth'

import LibraryDisplay from './LibraryDisplay'
import LibraryTags from './LibraryTags'


const Library = ( { getUser,user }) => {

  const [displayedAtmos, setDisplayedAtmos] = useState([])
  const [tags, setTags] = useState([])
  // const [ filtered, setFiltered ] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const [atmosError, setAtmosError] = useState('')

  const getAtmos = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/atmospheres')
      setDisplayedAtmos(data)

    } catch (error) {
      console.log(error)
      setAtmosError(error)
    }
  })

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get('/api/tags/')
        setTags(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAtmos()
    getTags()
    getUser()
  }, [])


  // useEffect(() => {
  //   const filtered = searchTags.map(tag => tag.atmospheres  ).filter(atmos => atmos.length > 0 ). 
  //   setDisplayedAtmos(filtered.flat())
  //   console.log(filtered)
  // }, [searchTags])
  const removeDuplicates = (arr, prop) => {
    const map = new Map()
    return arr.filter((obj) => {
      if (!map.has(obj[prop])) {
        map.set(obj[prop], true)
        return true
      }
      return false
    })
  }
  
  useEffect(() => {
    const filtered = searchTags.map(tag => tag.atmospheres  ).filter(atmos => atmos.length > 0)
    setDisplayedAtmos(removeDuplicates( filtered.flat(), 'id' ))
  }, [searchTags])


  return (
    <main className='library'>
      <h1> Library</h1>
      <div className='tags'>
        <LibraryTags tags={tags} setSearchTags={setSearchTags} searchTags={searchTags} />
      </div>
      < LibraryDisplay getUser={getUser} user={user} getAtmos={getAtmos} displayedAtmos={displayedAtmos} atmosError={atmosError} setDisplayedAtmos={setDisplayedAtmos} />
    </main>
  )
}


export default Library