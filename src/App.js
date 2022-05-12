import { useEffect } from 'react'
import NotFound from './components/pages/NotFound/NotFound';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import ComingSoon2 from './components/pages/ComingSoon2/ComingSoon2';
import BioData from './components/pages/CreateProfile/BioData/BioData';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import TellUsAboutYourself from './components/pages/CreateProfile/TellUsAboutYourself/TellUsAboutYourself';
import DefineIdealRoommate from './components/pages/CreateProfile/DefineIdealRoommate/DefineIdealRoommate';
import ViewAllRoommateRequests from './components/pages/ViewAllRoommateRequests/ViewAllRoommateRequests';
import CreateProfileThankYou from './components/pages/CreateProfile/CreateProfileThankYou/CreateProfileThankYou';
import CreateProfileInstruction from './components/pages/CreateProfile/CreateProfileInstruction/CreateProfileInstruction';
import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import CreateRooomateRequestInstruction from './components/pages/RoommateRequest/CreateRoommateRequestInstruction/CreateRoommateRequestInstruction';
import RoomLocation from './components/pages/RoommateRequest/RoomLocation/RoomLocation';
import RoomDetails from './components/pages/RoommateRequest/RoomDetails/RoomDetails';
import RoomPricing from './components/pages/RoommateRequest/RoomPricing/RoomPricing';
import RoomLook from './components/pages/RoommateRequest/RoomLook/RoomLook';
import CreateRoommateRequestThankYou from './components/pages/RoommateRequest/CreateRoommateRequestThankYou/CreateRoommateRequestThankYou';
import ViewSingleRoommateRequest from './components/pages/ViewSingleRoommateRequest/ViewSingleRoommateRequest';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ConnectionSent from './components/pages/ConnectionSent/ConnectionSent';
import ConnectionReceived from './components/pages/ConnectionReceived/ConnectionReceived';
import InactiveRequests from './components/pages/InactiveRequests/InactiveRequests';
import ActiveRequests from './components/pages/ActiveRequests/ActiveRequests';


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
          {/* Waitlist Endpoints */}
          <Route path='/' element={<ComingSoon2/>} />
          <Route path='/waitlist' element={<ComingSoon/>} />

          {/* Landing Pages */}
          <Route path='/create-request' element={<MakeRoommateRequestLandingPage/>} />
          <Route path='/view-requests' element={<FindRoommateRequestLandingPage/>} />
          
          <Route path='/view-all-requests' element={<ViewAllRoommateRequests/>} />
          <Route path='/roommate-request/:id' element={<ViewSingleRoommateRequest/>}/>

          {/* Create Profile */}
          <Route path='/bio-data' element={<BioData/>}/>
          <Route path='/ideal-roommate' element={<DefineIdealRoommate/>} />
          <Route path='/about-yourself' element={<TellUsAboutYourself/>} />
          <Route path='/create-profile-instruction' element={<CreateProfileInstruction/>} />
          <Route path='/create-profile-thankyou' element={<CreateProfileThankYou/>}/>

          {/* Roommate Request */}
          <Route path='/create-roommate-request-instruction' element={<CreateRooomateRequestInstruction/>}/>
          <Route path='/room-location' element={<RoomLocation/>}/>
          <Route path='/room-details' element={<RoomDetails/>}/>
          <Route path='/room-pricing' element={<RoomPricing/>}/>
          <Route path='/room-look' element={<RoomLook/>}/>
          <Route path='/create-roommate-request-thankyou' element={<CreateRoommateRequestThankYou/>} />
          
          {/* Dashboard related routes */}
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/connection-sent' element={<ConnectionSent/>}/>
          <Route path='/connection-received' element={<ConnectionReceived/>}/>
          <Route path='/inactive-requests' element={<InactiveRequests/>} />
          <Route path='/active-requests' element={<ActiveRequests/>}/>
          
          {/* Not Found */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    // </Router>
    
  );
}

export default App;
