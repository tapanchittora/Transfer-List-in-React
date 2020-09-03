import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Transferlist from './component/Transferlist'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Route path="/" component={Transferlist} />
     </BrowserRouter>
    </div>
  );
}

export default App;
