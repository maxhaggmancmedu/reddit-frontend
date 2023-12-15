import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
