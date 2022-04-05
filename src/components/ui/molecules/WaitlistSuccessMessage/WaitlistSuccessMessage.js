import P from "../../atoms/P/P";

const WaitlistSuccessMessage = () => {
    return ( 
        <div>
            <P
            customStyle={
                {
                    fontSize:'27px',
                    fontWeight: '600',
                    color: '#000000'
                }
            }  
            >You've successfully joined our waitlist</P>
            <P
            customStyle={
                {
                    fontSize:'24px',
                    fontWeight: '400',
                    color: '#7D7D7D'
                }
            }
            >You'll be the first to know when we launch</P>
        </div>
     );
}
 
export default WaitlistSuccessMessage;