import { useEffect, useState } from 'react'
import axios from 'axios'

import { isAuthenticated } from '../../../helpers/auth'

import { indexOf } from 'lodash'
import LibraryDisplay from './LibraryDisplay'


const Library = () => {

  const [ atmos, setAtmos ] = useState([])
  const [ displayedAtmos, setDisplayedAtmos ] = useState([])
  const [ tags, setTags ] = useState([])
  // const [ filtered, setFiltered ] = useState([])
  const [ searchTags, setSearchTags ] = useState([])
  const [ atmosError, setAtmosError ] = useState('')

  useEffect(() => {
    const getAtmos = async () => {
      try {
        const { data } = await axios.get('/api/atmospheres')
        setAtmos(data)

      } catch (error) {
        console.log(error)
        setAtmosError(error)
      }
    }
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
  }, [])



  const sortAtmos = (e) => {
    const openedUp = displayedAtmos.flat()
    if (e === 'Most Recent') {
      const timeModified = openedUp.map(atmo => {
        return { ...atmo, date_created: atmo.date_created.replace('T', ('_')).replace('Z', ('')) }
      })
      const dateSorted = timeModified.sort((a, b) => b.date_created.localeCompare(a.date_created))
      setDisplayedAtmos(dateSorted)
    } else if (e === 'Most Popular') {
      const popSorted = [...openedUp.sort((a, b) => b.put_in_library.length - a.put_in_library.length)]
      setDisplayedAtmos(popSorted)
    }

  }

  useEffect(() => {
    const filtered = searchTags.map(tag => tag.atmospheres).filter(atmos => atmos.length > 0)
    setDisplayedAtmos(filtered.flat())
  }, [searchTags])
  
  // console.log('current state ->', atmos)
  // console.log(tags)
  console.log('search tags ->', searchTags)
  // console.log( 'opened up', displayedAtmos.map(atmos => atmos))
  console.log('displayed atmos', displayedAtmos.flat())
  return (
    <>
      <h1> Library</h1>
      <select onChange={(e) => sortAtmos(e.target.value)}>
        <option > Most Recent</option>
        <option > Most Popular</option>
      </select>
      {tags.map(tag => {
        const handleAddTag = (e) => {
          if (searchTags.includes(tags.find(tag => tag.tag === e))) {
            setSearchTags(searchTags.filter( atmos => atmos.tag !== e))
            // console.log(searchTags.filter( atmos => atmos.tag !== e))
          } else {
            setSearchTags([...searchTags, tags.find(tag => tag.tag === e)])
          }
        }
        return (<button onClick={(e) => handleAddTag(e.target.name)} name={tag.tag} key={tag.id}> {tag.tag} </button>)
      })}
      < LibraryDisplay displayedAtmos={displayedAtmos} atmosError={atmosError} setDisplayedAtmos={setDisplayedAtmos}/>
    </>
  )
}


export default Library