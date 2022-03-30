const Error = ({error}) =>
{
      const errorFormatted = error.charAt(0).toUpperCase() + error.slice(1);

      return <p
      style={{
            background: '#f8d7da',
            padding: '15px 15px',
            borderRadius: '5px',
            color: '#842029',
            border: '1px solid #f5c2c7',
            marginBottom: '15px',
            fontSize: '15px'
      }}
      >{errorFormatted}</p>;
}
 
export default Error;
