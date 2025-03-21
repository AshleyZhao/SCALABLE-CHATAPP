import logo from './logo.svg';
import './App.css';
import { ChatContext } from './Context/ChatContext';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPanel from './Context/Pages/MainPanel/MainPanel';

function App() {
  const api = 'http://localhost:4000';
  const [store, setStore] = useState();
  const [showSearchResult, setShowSearchResult] = useState(false);

  const updateStore = (data) => {
    setStore(data);
  }

  return (
    <div className='mainApp'>
      <ChatContext.Provider value={{ api, store, updateStore, showSearchResult }}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPanel />} />
          </Routes>
        </Router>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
