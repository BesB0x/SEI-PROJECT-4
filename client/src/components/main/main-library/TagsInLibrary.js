
// const TagsInLibrary = () => {

//   tags.map(tag => {
//     const handleAddTag = (e) => {
//       if (searchTags.includes(tags.find(tag => tag.tag === e))) {
//         searchTags.splice(indexOf(e), 1)
//       } else {
//         setSearchTags([...searchTags, tags.find(tag => tag.tag === e)])
//       }
//       const filtered = searchTags.map(tag => tag.atmospheres).filter(atmos => atmos.length > 0)
//       setDisplayedAtmos(filtered)
//     }
//     return (<button onClick={(e) => handleAddTag(e.target.name)} name={tag.tag} key={tag.id}> {tag.tag} </button>)
//   })
// }

// export default TagsInLibrary