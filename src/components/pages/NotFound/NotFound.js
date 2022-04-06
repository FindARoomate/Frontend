import NotFoundTemplate from "../../templates/NotFoundTemplate/NotFoundTemplate";
import notFoundImage from './../../../images/not-found.svg';

const NotFound = () => {
    return( 
        <div>
            <NotFoundTemplate
            errorMessage = "The page you are looking for has been changed or is temporarily not available"
            buttonMessage = "Go Back Home"
            imageUrl = {notFoundImage}
            />
        </div>
     );
}
 
export default NotFound;