const Errors = ({errors}) => {

        errors.forEach((error) =>
        {
            console.log("error: " + error);
            return "error";
        })
}
 
export default Errors;
