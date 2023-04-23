import { useState } from 'react'

const LibraryTags = ({ tags, setSearchTags, searchTags }) => {

  const [ tagClicked,setTagClicked ] = useState(false)

  const handleAddTag = (name) => {
    setTagClicked(!tagClicked)
    if (!searchTags.includes(tags.find(tag => tag.tag === name))) {
      setSearchTags([...searchTags, tags.find(tag => tag.tag === name)])
    } else {
      setSearchTags(searchTags.filter(atmos => atmos.tag !== name))
    }
  }
  return (
    tags.map(tag => {
      return (<button className={ searchTags.some(t => t.tag === tag.tag) ? 'tag-green' : 'tag-red'} onClick={(e) => handleAddTag(e.target.name)} name={tag.tag} key={tag.id}> {tag.tag} </button>)
    })
  )
}

export default LibraryTags