import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import { UserContext } from "../../context";
import { useContext } from "react";

const Dashboard = () => 
{
  // const {isUserLoggedIn} = useContext(UserContext);

  // console.log("After: ", isUserLoggedIn);

    return ( 
       <DashboardTemplate
       />
     );
}
 
export default Dashboard;