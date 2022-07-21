import ErrorAlert from "../../ui/molecules/Alerts/ErrorAlert/ErrorAlert";

const CreateProfileErrors = ({errors}) => 
{
    console.log(errors);
    return(
        <>
            {Object.entries(errors).map((error) => 
            {
                console.log(error[0] + ": " + error[1]);
                return <ErrorAlert>{error[0] + ": " + error[1]}</ErrorAlert>
            })}
        </>
    )   
    
}
 
export default CreateProfileErrors;