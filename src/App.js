import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import NotFound from './components/pages/NotFound/NotFound';
import ContactUsTemplate from './components/templates/ContactUsTemplate/ContactUsTemplate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ComingSoon/>} />
          <Route path='/landing-page' element={<MakeRoommateRequestLandingPage/>} />
          <Route path='/contact' element={<ContactUsTemplate/>} />
          {/* 
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/contact' element={<Contact/>}/> */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
