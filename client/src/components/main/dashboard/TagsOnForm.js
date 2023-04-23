

const TagsOnForm = ( { userTag,formFields,handleAddTag, tag, i }) => {

  return (
    <button className={ formFields.tags.some(t => t.tag === tag.tag) ? 'tags tag-green' : 'tags tag-red'} key={i} onClick={handleAddTag} id={tag.id} name={tag.tag} > {tag.tag}  </button>
  )
}

export default TagsOnForm