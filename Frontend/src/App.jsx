import { useState } from 'react'
import LoginForm from "./pages/LoginForm"
import SignUp from "./pages/SignUp"
import './App.css'
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import {Routes , Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
{/*       <LoginForm /> */}
      <Routes>
        <Route path="/ForgotPassword" element = {<ForgotPassword />}/>
        <Route path="/ResetPassword/:token" element = {<ResetPassword />}/>
        <Route path="/" element = {<LoginForm />}/>
        <Route path="/SignUp" element = {<SignUp />}/>
      </Routes>
    </>
  )
}

export default App
