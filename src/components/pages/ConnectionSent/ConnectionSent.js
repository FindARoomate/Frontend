import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './ConnectionSent.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";

const ConnectionSent = () => 
{
    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Connection Sent</H2>    

                <div className={styles.listBoxContainer}>
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="declined"
                        dp={dp}
                    />
                    <ListBox
                        link = "/connection-sent/1"
                        name = "Chikelue Ebube"
                        description = "I am a church girl and I love playing"
                        tag="success"
                        dp={dp}
                    />
                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default ConnectionSent;