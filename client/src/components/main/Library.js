import { useEffect, useState } from 'react'
import axios from 'axios'

import { isAuthenticated } from '../../helpers/auth'

import Error from '../common/Error'
import { indexOf } from 'lodash'


const Library = () => {

  const [atmos, setAtmos] = useState([])
  const [ displayedAtmos,setDisplayedAtmos ] = useState([])
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const [atmosError, setAtmosError] = useState('')

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
    if (e === 'Most Recent') {
      const timeModified = atmos.map(atmo => {
        return { ...atmo, date_created: atmo.date_created.replace('T', ('_')).replace('Z', ('')) }
      })
      const dateSorted = timeModified.sort((a, b) => b.date_created.localeCompare(a.date_created))
      setAtmos(dateSorted)
    } else if (e === 'Most Popular') {
      const popSorted = [...atmos.sort((a, b) => b.put_in_library.length - a.put_in_library.length)]
      setAtmos(popSorted)
    }

  }

  const filteredAtmos = () => {

    const filtered = searchTags.map(tag => tag.atmospheres)
    // setDisplayedAtmos(filtered)
    console.log('filtered ->', searchTags)
  }
  filteredAtmos()


  // console.log('current state ->', atmos)
  console.log(tags)
  // console.log(searchTags)
  return (
    <>
      <h1> Library</h1>
      <select onChange={(e) => sortAtmos(e.target.value)}>
        <option > Most Recent</option>
        <option > Most Popular</option>
      </select>
      {tags.map(tag => {
        const handleAddTag = (e) => {
          
          if ( searchTags.includes(tags.find(tag => tag.tag === e))){
            searchTags.splice(indexOf(e),1)
          } else {
            setSearchTags([ ...searchTags, tags.find(tag => tag.tag === e) ])
          }

        }
        return (<button onClick={(e) => handleAddTag(e.target.name)} name={tag.tag} key={tag.id}> {tag.tag} </button>)
      })}
      <section className='atmos-wrapper'>
        {atmos.map(atmo => {
          return (
            <div key={atmo.id} className='atmos-tile'>
              <div>
                <button className='add-button'></button>
                <button className='view-button'></button>
              </div>
              <p> name: {atmo.name} </p>
              <p> Creator: {atmo.owner.username}</p>
              <p> added to {atmo.put_in_library.length} {atmo.put_in_library.length === 1 ? 'collection' : 'collections'} </p>
            </div>
          )
        })}
        {atmosError && <Error error={atmosError} />}
      </section>
    </>
  )
}


export default Library