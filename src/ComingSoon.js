import Header from './Header';
import LaunchingSoonImage from './images/launching-soon.svg';

const ComingSoon = () => {
    return ( 
        <div className="coming-soon">
            <Header/>
            <div className="body coming-soon-body">
                <div className="hero">
                    <div className="text">
                        <h1>Find The Perfect Roommate ...</h1>
                        <p>Connect with several rommmates that match your requirements.</p>
                    </div>
                    <div className="coming-soon-form">
                        <p>Get notified when this website goes live</p>
                        <form action="#">
                            <input type="text" placeholder="E-mail" />
                            <button>Notify Me</button>
                        </form>
                    </div>                    
                </div>
                <div className="launching-soon-image desktop-only">
                    <img src={LaunchingSoonImage} />

                </div>
               
            </div>
        </div>
     );
}
 
export default ComingSoon;