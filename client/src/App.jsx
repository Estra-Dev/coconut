import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Header from "./components/Header"
import Nav from "./components/Nav"
import More from "./pages/More"
import Market from "./pages/Market"
import MyStore from "./pages/MyStore"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import OnlyAdmin from "./components/OnlyAdmin"
import GenerateAssets from "./pages/GenerateAssets"

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
          <Route element={<PrivateRoute />}>
            <Route path="/market" element={<Market />} />
            <Route path="/my-store" element={<MyStore />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdmin />}>
            <Route path="/generate-asset" element={<GenerateAssets />} />
          </Route>
        </Routes>
        <div className=" sticky bottom-0 md:max-w-3xl md:mx-auto md:shadow-md md:p-3">
          <Nav />
        </div>
      </Router>
    </>
  )
}

export default App
