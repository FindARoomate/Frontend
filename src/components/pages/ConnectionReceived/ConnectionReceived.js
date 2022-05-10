import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './ConnectionReceived.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";

const ConnectionReceived = () => 
{
    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Connection Received</H2>    

                <div className={styles.listBoxContainer}>
                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />

                    <ListBox
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default ConnectionReceived;