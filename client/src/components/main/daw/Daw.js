const Daw = () => {

  const atmosphere = JSON.parse(localStorage.getItem('DAW-ITEM'))
  console.log(atmosphere)
  return (
    <main>
      <div className="daw-picture" style={{ backgroundImage: `url(${atmosphere.picture})` }}>
        <div className="controls">
        </div>
      </div>

    </main>
  )
}

export default Daw