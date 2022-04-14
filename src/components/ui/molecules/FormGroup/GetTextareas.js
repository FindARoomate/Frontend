const GetTextareas = ({textareas}) => 
{
    return(
        textareas.map((textarea) => 
        {
            return (<textarea
                key={textarea.key}
                type={textarea.type}
                placeholder={textarea.placeholder}
                required = {textarea.required}
                />
            );
        })
    );
}
 
export default GetTextareas;