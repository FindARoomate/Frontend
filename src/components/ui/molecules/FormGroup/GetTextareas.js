import Textarea from './../../atoms/Textarea/Textarea'

const GetTextareas = ({textareas}) => 
{
    return(
        textareas.map((textarea) => 
        {
            return (<Textarea
                key={textarea.key}
                type={textarea.type}
                placeholder={textarea.placeholder}
                required={textarea.required}
                ></Textarea>
            );
        })
    );
}
 
export default GetTextareas;