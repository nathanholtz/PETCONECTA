import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* pages */
import Home from './components/pages/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router> 
  );
}

export default App;
