const Success = ({message}) =>
{
      const messageFormatted = message.charAt(0).toUpperCase() + message.slice(1);

      return <p
      style={{
            background: '#cff4fc',
            padding: '15px 15px',
            borderRadius: '5px',
            color: '#055160',
            border: '1px solid #b6effb',
            marginBottom: '15px',
            fontSize: '15px'
      }}
      >{messageFormatted}</p>;
}
 
export default Success;