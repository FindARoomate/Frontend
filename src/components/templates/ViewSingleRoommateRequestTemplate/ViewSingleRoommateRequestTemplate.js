import P from '../../ui/atoms/P/P';
import 'mapbox-gl/dist/mapbox-gl.css';
import Img from './../../ui/atoms/Img/Img';
import H1 from '../../ui/atoms/Headings/H1/H1';
import H2 from '../../ui/atoms/Headings/H2/H2';
import H3 from '../../ui/atoms/Headings/H3/H3';
import Button from '../../ui/atoms/Button/Button';
import Header from '../../ui/organisms/Header/Header';
import backIcon from './../../../icons/back-icon.svg';
import washingMachine from './../../../icons/washing-machine.svg';
import styles from './ViewSingleRoommateRequestTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import displayPicture from './../../../images/view-single-roomate-display-picture.png';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
ReactMapboxGl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

const ViewSingleRoommateRequestTemplate = () => 
{

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZm9sYXJhbm1pamVzdXRvZnVubWkiLCJhIjoiY2wyd2NxcHE0MDV5dTNsbno3ZWMxZmJidSJ9.lnia2WE6dICt77XhejO1dQ'
  });
  

    return ( 
        <div className={styles.viewAll}>
            <Header/>
            <div className={styles.heading}>
                <div className={styles.headingAndIcon}>
                    <Img src={backIcon}/>
                    <H1>Female roommate needed in a self contain at Agbowo</H1>
                </div>
                <div className={styles.requestOwner}>
                        <P>Request created by <span className={styles.name}>Precious Faseyosan</span></P> 
                </div>
            </div>

            <div className={styles.imageContainer}>
                <div className={styles.imageGroup}>

                </div>
            </div>

            <div className={`${globalStyles.body} ${styles.viewSingleRequestBody}`}>
                <div className={styles.roomInformation}>
                    <div className={styles.topSection}>
                        <div className={styles.roomDetailsAndAmmenities}>
                            <H2>Room Details</H2>

                            <div className={styles.singleRoomInformationContainer}>
                                <div className={styles.singleRoomInformation}>
                                    <H3>Room Type</H3>
                                    <P>2 Bedroom Flat</P>
                                </div>

                                <div className={styles.singleRoomInformation}>
                                    <H3>Rent</H3>
                                    <P>₦100,000.00/Year</P>
                                </div>

                                <div className={styles.singleRoomInformation}>
                                    <H3>Other Bills</H3>
                                    <P>₦10,000.00 Monthly Electricity</P>
                                </div>

                                <div className={styles.singleRoomInformation}>
                                    <H3>Availability</H3>
                                    <P>1st, May 2022</P>
                                </div>

                                <div className={styles.singleRoomInformation}>
                                    <H3>No of person to occupy the room</H3>
                                    <P>2</P>
                                </div>

                                <div className={styles.singleRoomInformation}>
                                    <H3>No of roommate needed</H3>
                                    <P>1</P>
                                </div>
                            </div>

                            <div className={styles.ammenitiesContainer}>
                                <H2>Amenities</H2>

                                <div className={styles.ammenities}>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                    <div className={styles.singleAmmenity}>
                                        <Img src={washingMachine}/>
                                        <P>Washing Machine</P>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.desktopOwnerInformation}>
                            <div className={styles.personalInfo}>
                                <Img src ={displayPicture} />
                                <span>
                                    <H3>Precious Faseyosan</H3>
                                    <P>Student</P>
                                </span>
                            </div>
                            <div>
                                <div className={styles.information}>
                                    <P><span className={styles.infoHeading}>Age group: </span>20 - 25 years</P>
                                    <P><span className={styles.infoHeading}>Gender: </span>Female</P>
                                    <P><span className={styles.infoHeading}>Personality Type: </span>Introvert</P>
                                    <P><span className={styles.infoHeading}>Bio: </span>
                                        I am a church girl. I sleep for 10 hours everyday. I cannot live with someone with... 
                                        <span className={styles.readMore}>Read more</span>
                                    </P>
                                </div>
                                <Button>Connect Now</Button>
                            </div>
                        </div>
                        
                    </div>

                    <div className={styles.location}>
                        <div>
                            <H2>Location</H2>
                            <P styles={styles.address}>12, Alagbaka street, Akure Ondo State, Nigeria</P>
                        </div>
                        <div className={styles.map} id="single-roommate-request-map">
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            containerStyle={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 'inherit',
                            }}
                        >
                            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                            </Layer>
                        </Map>
                        
                        </div>
                    </div>

                    <div className={styles.additionalInformation}>
                        <H2>Additional information about room</H2>
                        <P>I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me. I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me. I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.</P>
                    </div>
                    
                </div>
                    
            </div>
            
            <div className={styles.mobileOwnerInformation}>
                <div className={styles.personalInfo}>
                    <Img src ={displayPicture} />
                    <span>
                        <H3>Precious Faseyosan</H3>
                        <P>Student</P>
                    </span>
                </div>
                <div>
                    <Button>Connect now</Button>
                </div>
            </div>
        </div>
     );
}
 
export default ViewSingleRoommateRequestTemplate;