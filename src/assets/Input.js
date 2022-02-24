const Input = ({name, placeholder, type, isRequired, label}) => {
    
    console.log(name);

    let required;

    if(isRequired)
    {
        required = 'required';
    }else
    {
        required = '';
    }

    if(label)
    {
        return (
            <div>
                <label>{label}</label>
                <input
                    type={type}
                    name={name}
                />  
            </div>
        );
    } else
    {
        return (
            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    {... required}
                />  
            </div>
        );
    }
   
}
 
export default Input;