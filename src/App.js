import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import MainTransIndex from './component/Main'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Route path="/" component={MainTransIndex} />
     </BrowserRouter>
    </div>
  );
}

export default App;
