import FindRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/FindRoommateRequestLandingPageTemplate/FindRoommateRequestLandingPageTemplate';

const FindRoommateRequestLandingPage = () => 
{
     // Hero Section
     var heading =  {tag: "H1", text: "Find the perfect roommates for you"}
     const heroSection = {heading}

     const roommateRequests = 
     [
          {
               id: 1,
               author: "Precious",
               Description: "Lorem ipsum dolor sit amet",
               buttonText: "Connect now"
          }
     ]
    return ( 
        <FindRoommateRequestLandingPageTemplate
          roommateRequests={roommateRequests}
        />
     );
}
 
export default FindRoommateRequestLandingPage;