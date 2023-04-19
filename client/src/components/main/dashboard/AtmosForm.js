import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const AtmosForm = ({ handleDelete, openEdit, title, setFormFields, formFields, setUserTag, handleSubmit, tags, handleCloudinary, atmosError, setAtmosError,userTag,authenticated,setTags }) => {

  const audioPreset = 'gee4hwat'
  const picturePreset = 'fzakjvwm'


  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setAtmosError('')
  }

  const handleTagChange = (e) => {
    setUserTag(e.target.value)
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    setFormFields({ ...formFields, tags: [...formFields.tags, e.target.name] })
  }

  const submitTag = async (e) => {
    e.preventDefault()
    try {
      console.log(userTag)
      setFormFields({ ...formFields, tags: [...formFields.tags, userTag] })
      await authenticated.post('api/tags/', { tag: userTag })
      const { data } = await authenticated.get('api/tags/')
      setTags(data)
      setUserTag('')
    } catch (error) {
      console.log(error)
    }
  }
  

  



  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
            <h1> {title} </h1>
            {/* name */}
            <label htmlFor='name'>Name</label>
            <input placeholder='name' type='text' name='name' onChange={handleChange} value={formFields.name} />
            {/* Tags */}
            <label htmlFor='tags'>Tags</label>
            <input type='tags' name='tags' onChange={handleTagChange} />
            <button onClick={submitTag} > Add Tag</button>
            {tags && tags.map((tag, i) => {
              return (
                <button className='tag-button' key={i} onClick={handleAddTag} name={tag.tag}> {tag.tag} </button>
              )
            })}
            <div>
              {/* Audio */}
              <label htmlFor='audio'>Audio</label>
              <input type='file' onChange={(e) => handleCloudinary(e, audioPreset, 'audio')} />
              {/* Picture */}
              <label htmlFor='passwordConfirmation'>Picture</label>
              <input type='file' onChange={(e) => handleCloudinary(e, picturePreset, 'picture')} />
            </div>
            <div>
              { openEdit && <button onClick={handleDelete}> Delete </button>}
              <button type='submit'>Create</button>
            </div>
            {atmosError && <h6 className='error-message'> {atmosError} </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )

}

export default AtmosForm