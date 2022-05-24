import ErrorAlert from './../../../molecules/Alerts/ErrorAlert/ErrorAlert';
const CreateAccountErrors = ({errors}) => 
{
    
    const entries = Object.entries(errors);                 

    return (   
        <div>
            {entries.map((error) => {
                return (
                <ErrorAlert key={error[0]}>
                    {error[1][0]}
                </ErrorAlert>
                )
            })
            }
        </div>
      
      );
}
 
export default CreateAccountErrors;