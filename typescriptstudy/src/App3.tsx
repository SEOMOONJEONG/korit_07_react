import './App.css'
import HelloComponent from './HelloComponent'
import ByeComponent from './ByeComponent'

function App() {
  

  return (
    <>
      <HelloComponent name='김일' age={20} />
      <br />
      <br />
      <ByeComponent name='김일' />
    </>
  )
}

export default App
