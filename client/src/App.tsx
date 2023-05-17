import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/landing';
import Listing from './components/list';
import AddFile from './components/addFile';
import Navi from './components/nav';

function App() {
  return (
    <Router>
    <Navi></Navi>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/list" element={<Listing />} />
      <Route path="/new" element={<AddFile />} />
    </Routes>
    </Router>
  );
}

export default App;
