import Header from './Header';
import rocket from './images/rocket.svg';
import launchingSoonDesktop from './images/launching-soon-desktop.svg';
import launchingSoonMobile from './images/launching-soon-mobile.svg';

const ComingSoon = () => {
    return ( 
        <div className="coming-soon">
            <Header/>
            <div className="coming-soon-body">
                <div className="hero">
                    <div className="text">
                        <h1>LAUNCHING<br/>SOON!!!</h1>
                        <img src={launchingSoonDesktop} alt="" class="heading-bg-desktop"/>
                        <img src={launchingSoonMobile} alt="" class="heading-bg-mobile"/>
                        <p>Get notified when this website goes live</p>
                    </div>
                    <img src={rocket} />
                </div>

                <div className="coming-soon-form">
                    <form action="#">
                        <input type="text" placeholder="E-mail" />
                        <button>Notify Me</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default ComingSoon;