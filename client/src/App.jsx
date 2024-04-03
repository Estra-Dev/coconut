import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Header from "./components/Header"
import Nav from "./components/Nav"
import More from "./pages/More"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/more" element={<More />} />
        </Routes>
        <Nav />
      </Router>
    </>
  )
}

export default App
