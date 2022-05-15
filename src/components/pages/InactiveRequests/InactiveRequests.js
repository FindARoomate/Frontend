import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './InactiveRequests.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";

const InactiveRequests = () => 
{
    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Inactive Requests</H2>    

                <div className={styles.listBoxContainer}>
                <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />
                    <ListBox
                        link = "/request/1"
                        name = "Chikelue Ebube"
                        description = "am a church girl and I love playing"
                        tag="pending"
                        dp={dp}
                    />

                    <ListBox
                        link = "/request/1"
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
 
export default InactiveRequests;