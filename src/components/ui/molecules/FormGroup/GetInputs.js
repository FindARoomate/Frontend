import Input from '../../atoms/Input/Input';

const GetInputs = ({inputs}) => 
{
    return(
            inputs.map((input) => 
            {
                return (<Input
                    key={input.key}
                    type={input.type}
                    placeholder={input.placeholder}
                    required = {input.required}
                    />
                );
            })
    );
}
 
export default GetInputs;