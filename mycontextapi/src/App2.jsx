import AuthContext from './AuthContext'
import MyComponent from './MyComponent'
import MyComponent2 from './MyComponent2'
import MyTable from './MyTable'
import MyForm from './MyForm'
import './App.css'

function App() {

  const username = '김일';

  return (
    <AuthContext.Provider value = {username}>
      <MyComponent />
      <br />
      <br />
      <MyComponent2 />
      <br />
      <br />
      <MyTable />
      <MyForm />
    </AuthContext.Provider>
  )
}

export default App
