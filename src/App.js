
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/icons/css/all.css';

import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import New from './components/New';
import {Profile} from './components/Profile';
import {Calif} from './components/Calif';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calif" element={<Calif />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
