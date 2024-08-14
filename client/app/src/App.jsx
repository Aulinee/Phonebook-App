import React from 'react'
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Contact from './components/views/Contact.jsx';
import Manage from './components/views/Manage.jsx';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
}

export default App
