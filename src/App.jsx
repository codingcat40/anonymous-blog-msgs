import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import BlogDetail from './components/BlogDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/home/:id' element={<BlogDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
