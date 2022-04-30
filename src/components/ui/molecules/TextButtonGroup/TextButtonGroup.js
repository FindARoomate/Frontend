import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TextButtonGroup = ({heading, description, button, customStyle}) => 
{
    AOS.init();//intilize on scroll animation
    
    return ( 
        <div
            style={customStyle}
        >
            <div data-aos="zoom-in" data-aos-duration="700">{React.cloneElement(heading)}</div>
            <div 
                data-aos="fade-up"
                data-aos-delay="300" 
                data-aos-duration="1000"
            >
                {description && React.cloneElement(description)}
            </div>
            <div 
                data-aos="slide-up"
                data-aos-delay="200" 
                data-aos-duration="1000"

            >{button && React.cloneElement(button)}</div>
        </div>
     );
}
 
export default TextButtonGroup;