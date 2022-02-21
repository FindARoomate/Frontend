import mobileContactIcon from './icons/mobile-contact-icon.svg';
import Button from './assets/Button';
import Header from './Header';

const Contact = () => {
    return ( 
    <div className="contact">

        <Header/>
        
        <div className='body contact-body'>
            <div>
                <h3>Contact Us</h3>
                <h1>How can we help you?</h1>
                <p className='text-light'>Fill the form or send an email</p>

                <div className="contact-box">
                    <span className="contact-type">
                        <img src={mobileContactIcon} alt="Contact Icon" className='mobile-contact-icon'/>
                        Email Address
                    </span>
                    <span className="contact-content">
                        contact@findaroommate.com
                    </span>
                </div>
            </div>

            <div className="contact-form">
                <form action="#">
                    <input type="text" name="name" placeholder='Name' required />
                    <input type="email" name="email" placeholder='Email' required />
                    <textarea type="text" name="message" placeholder='Message' required />
                    <Button link="/">Submit</Button>
                </form>
            </div>           

        </div>
    </div>

     );
}
 
export default Contact;