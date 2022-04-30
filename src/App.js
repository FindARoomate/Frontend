import { useEffect } from 'react'
import NotFound from './components/pages/NotFound/NotFound';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import ComingSoon2 from './components/pages/ComingSoon2/ComingSoon2';
import BioData from './components/pages/CreateProfile/BioData/BioData';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import TellUsAboutYourself from './components/pages/CreateProfile/TellUsAboutYourself/TellUsAboutYourself';
import DefineIdealRoommate from './components/pages/CreateProfile/DefineIdealRoommate/DefineIdealRoommate';
import ViewMoreRoommateRequests from './components/pages/ViewMoreRoommateRequests/ViewMoreRoommateRequests';
import CreateProfileThankYou from './components/pages/CreateProfile/CreateProfileThankYou/CreateProfileThankYou';
import CreateProfileInstruction from './components/pages/CreateProfile/CreateProfileInstruction/CreateProfileInstruction';
import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import CreateRooomateRequestInstruction from './components/pages/RoommateRequest/CreateRoommateRequestInstruction/CreateRoommateRequestInstruction';
import RoomLocation from './components/pages/RoommateRequest/RoomLocation/RoomLocation';


function App() 
{

  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  return (
    // <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ComingSoon2/>} />
          <Route path='/waitlist' element={<ComingSoon/>} />
          <Route path='/create-request' element={<MakeRoommateRequestLandingPage/>} />
          <Route path='/view-requests' element={<FindRoommateRequestLandingPage/>} />
          <Route path='/view-more-requests' element={<ViewMoreRoommateRequests/>} />
          <Route path='/bio-data' element={<BioData/>}/>
          <Route path='/ideal-roommate' element={<DefineIdealRoommate/>} />
          <Route path='/about-yourself' element={<TellUsAboutYourself/>} />
          <Route path='/create-profile-instruction' element={<CreateProfileInstruction/>} />
          <Route path='/create-profile-thankyou' element={<CreateProfileThankYou/>}/>

          {/* Roommate Request */}
          <Route path='/create-roommate-request-instruction' element={<CreateRooomateRequestInstruction/>}/>
          <Route path='/room-location' element={<RoomLocation/>}/>

          {/* Not Found */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    // </Router>
    
  );
}

export default App;
