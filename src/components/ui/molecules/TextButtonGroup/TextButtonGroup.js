import React from "react";
import Button from "../../atoms/Button/Button";
import H1 from "../../atoms/Headings/H1/H1";
import H2 from "../../atoms/Headings/H2/H2";
import H3 from "../../atoms/Headings/H3/H3";
import P from "../../atoms/P/P";

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