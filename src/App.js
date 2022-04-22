import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import NotFound from './components/pages/NotFound/NotFound';
  import ViewMoreRoommateRequests from './components/pages/ViewMoreRoommateRequests/ViewMoreRoommateRequests';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ComingSoon/>} />
          <Route path='/create-request' element={<MakeRoommateRequestLandingPage/>} />
          <Route path='/view-requests' element={<FindRoommateRequestLandingPage/>} />
          <Route path='/view-more-requests' element={<ViewMoreRoommateRequests/>} />
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
