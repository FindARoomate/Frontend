import React from "react";

const TextButtonGroup = ({heading, description, button, customStyle}) => {
    return ( 
        <div
            style={customStyle}
        >
            {React.cloneElement(heading)}
            {description && React.cloneElement(description)}
            {button && React.cloneElement(button)}
        </div>
     );
}
 
export default TextButtonGroup;