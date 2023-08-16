import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import LibraryDisplay from './LibraryDisplay'
import LibraryTags from './LibraryTags'


const Library = ({ getUser, user, sendToDaw }) => {

  const [allAtmos, setAllAtmos] = useState([])
  const [displayedAtmos, setDisplayedAtmos] = useState([])
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const [atmosError, setAtmosError] = useState('')



  const getAtmos = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/atmospheres/')
      if (searchTags.length === 0 ) {
        setDisplayedAtmos(data)
        setAllAtmos(data)
      } else {
        const filteredList = data.map( atmos => {
          if ( atmos.tags.map( tags => searchTags.map( search => search.tag === tags.tag ? true : false)).flat().includes(true)) {
            return (
              atmos
            )
          }
        } )
        setDisplayedAtmos(filteredList.filter( atmos => Boolean(atmos) === true ))
      }
    } catch (error) {
      console.log(error)
      setAtmosError(error)
    }
  })



  useEffect(() => {
    if ( searchTags.length < 1){
      setDisplayedAtmos(allAtmos)
    }
  }, [searchTags])


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
    const filtered = searchTags.map(tag => tag.atmospheres).filter(atmos => atmos.length > 0)
    setDisplayedAtmos(removeDuplicates(filtered.flat(), 'id'))
  }, [searchTags])


  return (
    <main className='library'>
      <h1> Library</h1>
      <div className='tags'>
        <LibraryTags setDisplayedAtmos={setDisplayedAtmos} allAtmos={allAtmos} tags={tags} setSearchTags={setSearchTags} searchTags={searchTags} />
      </div>
      < LibraryDisplay allAtmos={allAtmos} searchTags={searchTags} getUser={getUser} user={user} getAtmos={getAtmos} displayedAtmos={displayedAtmos} atmosError={atmosError} setDisplayedAtmos={setDisplayedAtmos} />
    </main>
  )
}


export default Library