import Header from './Header';
import Button from './assets/Button';
import notFoundImage from './images/not-found.svg';

const NotFound = () => {
    return ( 
        <div className="not-found">
            <Header/>
            <div className='not-found-container'>
                <img src={notFoundImage} alt="Not Found"/>
                <p className="text-light">The page you are looking for has been changed or is temporarily not available</p>
                <Button link="/">Go Back Home</Button>
            </div>
        </div>
     );
}
 
export default NotFound;