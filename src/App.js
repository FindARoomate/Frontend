import MakeRoommateRequestLandingPage from './components/pages/LandingPages/MakeRoommateRequestLandingPage/MakeRoommateRequestLandingPage';
import FindRoommateRequestLandingPage from './components/pages/LandingPages/FindRoommateRequestLandingPage/FindRoommateRequestLandingPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ComingSoon from './components/pages/ComingSoon/ComingSoon';
import NotFound from './components/pages/NotFound/NotFound';
import ViewMoreRoommateRequests from './components/pages/ViewMoreRoommateRequests/ViewMoreRoommateRequests';
import CreatePersonalProfileTemplate from './components/templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate';
import BioDataTemplate from './components/templates/CreatePersonalProfileTemplate/BioDataTemplate/BioDataTemplate';
import DefineIdealRoommateTemplate from './components/templates/CreatePersonalProfileTemplate/DefineIdealRoommateTemplate/DefineIdealRoommateTemplate';
import TellUsAboutYourselfTemplate from './components/templates/CreatePersonalProfileTemplate/TellUsAboutYourselfTemplate/TellUsAboutYourselfTemplate';
import CreateProfileThankYouTemplate from './components/templates/CreatePersonalProfileTemplate/CreateProfileThankYouTemplate/CreateProfileThankYouTemplate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ComingSoon/>} />
          <Route path='/create-request' element={<MakeRoommateRequestLandingPage/>} />
          <Route path='/view-requests' element={<FindRoommateRequestLandingPage/>} />
          <Route path='/view-more-requests' element={<ViewMoreRoommateRequests/>} />
          <Route path='/personal-profile' element={<CreatePersonalProfileTemplate/>}/>
          <Route path='/bio-data' element={<BioDataTemplate/>}/>
          <Route path='/ideal-roommate' element={<DefineIdealRoommateTemplate/>}/>
          <Route path='/about-yourself' element={<TellUsAboutYourselfTemplate/>}/>
          <Route path='/create-profile-thankyou' element={<CreateProfileThankYouTemplate/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
