import { useEffect, useState } from 'react'
import axios from 'axios'

import { isAuthenticated } from '../../helpers/auth'

import Error from '../common/Error'


const Library = () => {

  const [atmos, setAtmos] = useState([])
  const [tags, setTags] = useState([])
  const [atmosError, setAtmosError] = useState('')
  const [ value,setValue ] = useState('')

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
      const timeModified = atmos.map( atmo => {
        return { ...atmo, date_created: atmo.date_created.replace('T', ('_')).replace('Z', ('')) }
      } )
      const dateSorted = timeModified.sort( (a,b) => b.date_created.localeCompare(a.date_created))
      console.log('date sorted ->', dateSorted)
      setAtmos(dateSorted)
    } else if (e === 'Most Popular') {
      const popSorted = atmos.sort( (a,b)=> b.put_in_library.length - a.put_in_library.length  )
      console.log('pop sorted->' , popSorted)
      setAtmos(popSorted)
    }

  }

  useEffect(() => {
    atmos
  }, [setAtmos])

  
  console.log('current state ->', atmos)
  // console.log(tags)
  return (
    <>
      <h1> Library</h1>
      <select onChange={(e) => sortAtmos(e.target.value)}>
        <option > Most Recent</option>
        <option > Most Popular</option>
      </select>
      {tags.map(tag => {
        const handleAddTag = () => {
          console.log('added')
        }
        return (<div onClick={handleAddTag} key={tag.id}> {tag.tag} </div>)
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
        { atmosError && <Error error={atmosError} /> }
      </section>
    </>
  )
}


export default Library