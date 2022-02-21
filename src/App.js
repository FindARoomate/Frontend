import Contact from './Contact';
import NotFound from './NotFound';
import ComingSoon from './ComingSoon';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ComingSoon/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
