const Errors = ({errors}) => {
        return errors.map((error) => {
          console.log("error: " + error);
          return "error";
        });
}
 
export default Errors;
