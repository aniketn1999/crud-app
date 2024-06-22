import React from 'react'
import Navbar from './Components/Navbar'
import Create from './Components/Create'
import { Routes, Route } from "react-router-dom";
import Read from './Components/Read';
import Update from './Components/Update';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Create />}></Route>
        <Route exact path="/read" element={<Read />}></Route>
        <Route exact path="/edit/:id" element={<Update />}></Route>
      </Routes>
    </>
  )
}

export default App
