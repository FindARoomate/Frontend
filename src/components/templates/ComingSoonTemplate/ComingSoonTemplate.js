import Header from '../../../Header';
import ComingSoonPageForm from '../../../components/ui/organisms/ComingSoonPageForm/ComingSoonPageForm';
import { useState } from 'react';

const ComingSoon = ({headingText, subText, image}) => {
    return ( 
        <div className="coming-soon">
            <Header/>
            <div className="body coming-soon-body">
                <div className="hero">
                    
                    <div className="text">
                        <h1>{headingText}</h1>
                        <p>{subText}</p>
                    </div>
                    
                    <div className="coming-soon-form">
                        <ComingSoonPageForm/>
                    </div>
                    c
                </div>
                <div className="launching-soon-image desktop-only">
                    <img src={image} />

                </div>
               
            </div>
        </div>
     );
}
 
export default ComingSoon;