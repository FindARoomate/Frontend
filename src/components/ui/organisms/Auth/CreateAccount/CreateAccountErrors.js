import ErrorAlert from './../../../molecules/Alerts/ErrorAlert/ErrorAlert';
const CreateAccountErrors = ({errors}) => {
    
    const entries = Object.entries(errors);                 
    console.log("here");

    return (   
        <div>
            {entries.map((error) => {
                return (
                <ErrorAlert 
                    key={error[0]}
                    message={error[1][0]}
                />)
            })
            }
        </div>
      
      );
}
 
export default CreateAccountErrors;