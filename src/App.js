import { useLayoutEffect, createContext} from 'react'
import NotFound from './components/pages/NotFound/NotFound';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import ComingSoon2 from './components/pages/ComingSoon2/ComingSoon2';
import {Route, Routes, useLocation} from 'react-router-dom';
import ViewAllRoommateRequests from './components/pages/ViewAllRoommateRequests/ViewAllRoommateRequests';
import CreateProfileThankYou from './components/pages/CreateProfile/CreateProfileThankYou/CreateProfileThankYou';
import CreateProfileInstruction from './components/pages/CreateProfile/CreateProfileInstruction/CreateProfileInstruction';
import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import CreateRooomateRequestInstruction from './components/pages/CreateRoommateRequest/CreateRoommateRequestInstruction/CreateRoommateRequestInstruction';
import CreateRoommateRequestThankYou from './components/pages/CreateRoommateRequest/CreateRoommateRequestThankYou/CreateRoommateRequestThankYou';
import ViewSingleRoommateRequest from './components/pages/ViewSingleRoommateRequest/ViewSingleRoommateRequest';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ConnectionSent from './components/pages/ConnectionSent/ConnectionSent';
import ConnectionReceived from './components/pages/ConnectionReceived/ConnectionReceived';
import SingleConnectionReceived from './components/pages/SingleConnectionReceived/SingleConnectionReceived';
import SingleConnectionSent from './components/pages/SingleConnectionSent/SingleConnectionSent';
import InactiveRequests from './components/pages/InactiveRequests/InactiveRequests';
import ActiveRequests from './components/pages/ActiveRequests/ActiveRequests';
import SingleRequest from './components/pages/SingleRequest/SingleRequest';
import Profile from './components/pages/Profile/Profile';
import Notification from './components/pages/Notification/Notification';
import CreateProfile from './components/pages/CreateProfile/CreateProfile';
import ActivateEmail from './components/pages/ActivateEmail/ActivateEmail';
import CreateRoommateRequest from './components/pages/CreateRoommateRequest/CreateRoommateRequest';


function App() 
{
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
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
          element.scrollIntoView({behavior: "smooth"});
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
          
          {/* Confirm Email */}
          <Route path='/confirm-email/:uid/:token' element={<ActivateEmail/>} />

          {/* View Roommate Request Screens */}
          <Route path='/view-all-requests' element={<ViewAllRoommateRequests/>} />
          <Route path='/roommate-request/:id' element={<ViewSingleRoommateRequest/>}/>

          {/* Create Profile */}
          <Route path='/create-profile-instruction' element={<CreateProfileInstruction/>} />
          <Route path='/create-profile' element={<CreateProfile/>} />
          <Route path='/create-profile-thankyou' element={<CreateProfileThankYou/>}/>

          {/* Roommate Request */}
          <Route path='/create-roommate-request-instruction' element={<CreateRooomateRequestInstruction/>}/>
          <Route path='/create-roommate-request' element={<CreateRoommateRequest/>} />
          <Route path='/create-roommate-request-thankyou' element={<CreateRoommateRequestThankYou/>} />
          
          {/* Dashboard related routes */}
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/connection-sent' element={<ConnectionSent/>}/>
          <Route path='/connection-received' element={<ConnectionReceived/>}/>
          <Route path='/inactive-requests' element={<InactiveRequests/>} />
          <Route path='/active-requests' element={<ActiveRequests/>}/>


          <Route path='/connection-received/1' element={<SingleConnectionReceived/>}/>
          <Route path='/connection-sent/1' element={<SingleConnectionSent/>}/>
          <Route path='/request/:id' element={<SingleRequest/>}/>

          {/* Profile */}
          <Route path='/profile' element={<Profile/>}/>

          {/* Notification */}
          <Route path='/notifications' element={<Notification/>}/>

          {/* Not Found */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    // </Router>
    
  );
}

export default App;
