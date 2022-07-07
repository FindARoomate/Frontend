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
import Protected from './Protected';
import IdealRoommate from './components/pages/IdealRoommate/IdealRoommate';
import ShowMap from './components/pages/ShowMap';
import GuestProfile from './components/pages/GuestProfile/GuestProfile';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
      <div className="App">
        <QueryClientProvider client={queryClient}>
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
          <Route path='/create-profile-instruction' element={<Protected><CreateProfileInstruction/></Protected>} />
          <Route path='/create-profile' element={<Protected><CreateProfile/></Protected>} />
          <Route path='/create-profile-thankyou' element={<Protected><CreateProfileThankYou/></Protected>}/>

          {/* Guest Profile */}
          <Route path='/guest-profile/:id' element={<Protected checkProfile><GuestProfile/></Protected>}/>

          {/* Roommate Request */}
          <Route path='/create-roommate-request-instruction' element={<Protected checkProfile><CreateRooomateRequestInstruction/></Protected>}/>
          <Route path='/create-roommate-request' element={<Protected checkProfile><CreateRoommateRequest/></Protected>} />
          <Route path='/create-roommate-request-thankyou' element={<Protected checkProfile><CreateRoommateRequestThankYou/></Protected>} />
          
          {/* Dashboard related routes */}
          <Route path='/dashboard' element={<Protected checkProfile><Dashboard/></Protected>}/>
          <Route path='/connection-sent' element={<Protected checkProfile><ConnectionSent/></Protected>}/>
          <Route path='/connection-received' element={<Protected checkProfile><ConnectionReceived/></Protected>}/>
          <Route path='/inactive-requests' element={<Protected checkProfile><InactiveRequests/></Protected>} />
          <Route path='/active-requests' element={<Protected checkProfile><ActiveRequests/></Protected>}/>


          <Route path='/connection-received/:id' element={<Protected checkProfile><SingleConnectionReceived/></Protected>}/>
          <Route path='/connection-sent/:id' element={<Protected checkProfile><SingleConnectionSent/></Protected>}/>
          <Route path='/request/:id' element={<Protected checkProfile><SingleRequest/></Protected>}/>

          {/* Profile */}
          <Route path='/profile' element={<Protected checkProfile><Profile/></Protected>}/>

          {/* Ideal Roommate */}
          <Route path='/ideal-roommate' element={<Protected checkProfile><IdealRoommate/></Protected>}/>

          {/* Notification */}
          <Route path='/notifications' element={<Protected checkProfile><Notification/></Protected>}/>

          <Route path='/map' element={<ShowMap/>}/>

          {/* Not Found */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
        </QueryClientProvider>

      </div>    
  );
}

export default App;
