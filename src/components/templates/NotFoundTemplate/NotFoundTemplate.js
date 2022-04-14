import styles from './NotFoundTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import Header from '../../ui/organisms/Header/Header';
import Button from '../../ui/atoms/Button/Button';
import P from '../../ui/atoms/P/P';
import Img from '../../ui/atoms/Img/Img'
import {Link} from 'react-router-dom';

const NotFoundTemplate = ({errorMessage, buttonMessage, imageUrl}) => {
    return ( 
        <div>
            <Header/>
            <div className={`${globalStyles.body} ${styles.notFoundContainer}`}>
                <Img src={imageUrl} alt="Not Found"/>
                <P
                    customStyle={{
                        color: '#7D7D7D',
                        textAlign: 'center'
                    }}
                >
                    {errorMessage}
                </P>

                <Link to="/">
                    <Button customStyle={{maxWidth: '270px'}}>{buttonMessage}</Button>
                </Link>
                
            </div>
        </div>
     );
}
 
export default NotFoundTemplate;