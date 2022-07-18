import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DisplayMap = ({lng, lat}) => 
{
    return ( 
    <Map
      initialViewState=
      {{
        longitude: lng,
        latitude: lat,
        zoom: 14
      }}
      mapboxAccessToken="pk.eyJ1IjoiZm9sYXJhbm1pamVzdXRvZnVubWkiLCJhIjoiY2wyd2NuN29pMGtqdTNlcW1yMWhscG9nZyJ9.rg6JscEQVRfH8qxoPoJTiw"
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/folaranmijesutofunmi/cl5qgg3ri000r15lvtpn7q06h"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom" >
        <p>📍</p>
      </Marker>
    </Map>
     );
}
 
export default DisplayMap;