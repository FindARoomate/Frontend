import { useEffect } from 'react'
import BioData from './components/pages/BioData/BioData';
import NotFound from './components/pages/NotFound/NotFound';
import ComingSoon2 from './components/pages/ComingSoon2/ComingSoon2';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import CreateProfileThankYou from './components/pages/CreateProfileThankYou/CreateProfileThankYou';
import TellUsAboutYourself from './components/pages/TellUsAboutYourself/TellUsAboutYourself';
import DefineIdealRoommate from './components/pages/DefineIdealRoommate/DefineIdealRoommate';
import OnboardingInstruction from './components/templates/OnboardingInstruction/OnboardingInstruction';
import ViewMoreRoommateRequests from './components/pages/ViewMoreRoommateRequests/ViewMoreRoommateRequests';
import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import CreateProfileInstruction from './components/pages/CreateProfileInstruction/CreateProfileInstruction';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';


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
          <Route path='/onboarding' element={<OnboardingInstruction/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    // </Router>
    
  );
}

export default App;
