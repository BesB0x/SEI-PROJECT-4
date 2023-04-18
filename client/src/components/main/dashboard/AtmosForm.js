import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const AtmosForm = ({ setFormFields,formFields,setUserTag,handleSubmit,submitTag,tags,handleCloudinary,atmosError,setAtmosError,handleAddTag }) => {
  
  const audioPreset = 'gee4hwat'
  const picturePreset = 'fzakjvwm'

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setAtmosError('')
  }

  const handleTagChange = (e) => {
    setUserTag(e.target.value)
  }

  return (
    <main className='form-page'>
      <Container >
        <Row>
          <Col as='form' xs='10' md='6' lg='4' onSubmit={handleSubmit}>
            <h1> Create An Atmosphere </h1>
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
            {/* Audio */}
            <label htmlFor='audio'>Audio</label>
            <input type='file' onChange={(e) => handleCloudinary(e, audioPreset, 'audio')} />
            {/* Picture */}
            <label htmlFor='passwordConfirmation'>Picture</label>
            <input type='file' onChange={(e) => handleCloudinary(e, picturePreset, 'picture')} />
            <button>Create</button>
            {atmosError && <h6 className='error-message'> {atmosError} </h6>}
          </Col>
        </Row>
      </Container>
    </main>
  )

}

export default AtmosForm