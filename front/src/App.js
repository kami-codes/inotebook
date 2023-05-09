import Navbar from "./components/Navbar";
import Home from './components/Home'
import About from './components/About'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Footer from "./components/Footer";



function App() {

  const [alert, setalert] = useState(null)

  const showAlert = (message, type)=>{
    setalert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert = {showAlert} />} />
            <Route exact path="/about" element={<About  />} />
            <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </NoteState>


    </>
  );
}

export default App;
