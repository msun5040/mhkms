import React from 'react';
import logo from './logo.svg';
import ImageCanvas from './ImageCanvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='canvas' id="canvas"> 
          <ImageCanvas />
      </div>
    </div>
  );
}

export default App;
