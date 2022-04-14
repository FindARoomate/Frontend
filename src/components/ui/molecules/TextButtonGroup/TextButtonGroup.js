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
            {/* The heading tag (H1, H2, H3, etc) with the heading text*/}
            {heading.tag == "H1" && <H1 customStyle={heading.customStyle}>{heading.text}</H1>}
            {heading.tag == "H2" && <H2 customStyle={heading.customStyle}>{heading.text}</H2>}
            {heading.tag == "H3" && <H3 customStyle={heading.customStyle}>{heading.text}</H3>}

            {description && 
                (<P customStyle={description.customStyle ? description.customStyle : {} }>
                    {description.text}
                </P>)
            }

            <Button customStyle={button.customStyle ? button.customStyle : {}}>
                {button.text}
            </Button>

        </div>
     );
}
 
export default TextButtonGroup;