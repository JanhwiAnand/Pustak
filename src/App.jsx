import { React } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message={"Hello, i am alert"}/>
          {/* <div className="container my-3">
<TextForm alertmessg={showalert}heading="Enter the text to analyze"/>
</div> */}
          <div className="container">
            <Routes>
              <Route path="/About" element={<About />} />
            </Routes>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/login" element={<Login />}/>
            </Routes>
              <Routes>
                  <Route path="/signup" element={<Signup />}/>
              </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
      
    </>
  );
}

export default App;
