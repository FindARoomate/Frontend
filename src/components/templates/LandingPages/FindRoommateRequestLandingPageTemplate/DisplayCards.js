import P from "../../../ui/atoms/P/P";
import Card from "../../../ui/organisms/Card/Card";
import styles from './DisplayCards.module.css';
import dp from './../../../../images/card-display-picture.jpg';
import Img from './../../../ui/atoms/Img/Img';
import backBtn from './../../../../icons/back-icon.svg';
import nextBtn from './../../../../icons/forward-icon.svg';
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";

const DisplayCards = ({data, pagination, count, filters = {}}) => 
{
    const [filteredData, setFilteredData] = useState(data);
    console.log(filters)

    const numOfPaginationPages = Math.ceil(count/15);

    //getting pagination links
    const search = useLocation().search;
    let pageId = new URLSearchParams(search).get('page');
    if(!pageId) pageId = 1;
    const nextPageId = parseInt(pageId)+1;
    const prevPaginationUrl = (pageId === 1) ? "" : ("?page="+(pageId-1));
    const nextPaginationUrl = (pageId===numOfPaginationPages) ? `${"?page="+numOfPaginationPages}` : `${"?page="+nextPageId}`;

    const paginationPagesArray = [];
   for(let i = 0; i< numOfPaginationPages-1; i++)
    {
        paginationPagesArray.push(i+1);
    }
    console.log(filteredData)
    useEffect(() => 
    {

        const filtersArray = Object.keys(filters);

        if(filtersArray.length == 0)
        {
            setFilteredData(data);
        }

        if(filtersArray.length > 0)
        {
            let newFilteredData;

            let unfilteredData;

            filtersArray.forEach((filterKey, index) => 
            {
                //initializing unfilteredData
                unfilteredData = (index === 0) ? data : newFilteredData


                if((filterKey === 'gender') || (filterKey === 'religion')  || (filterKey ===  'personality'))
                {
                    let tempFilteredData = [];
                    unfilteredData.forEach((datum) => 
                    {
                        if(datum.profile[filterKey].toLowerCase() == filters[filterKey].toLowerCase()) tempFilteredData.push(datum)
                    });

                    newFilteredData = tempFilteredData;
                }

                if(filterKey === 'room_type')
                {
                    let tempFilteredData = [];
                    unfilteredData.forEach((datum) => 
                    {
                        if(datum[filterKey].toLowerCase() == filters[filterKey].toLowerCase()) tempFilteredData.push(datum)
                    });

                    newFilteredData = tempFilteredData;
                }

                console.log("Unfiltered Data", unfilteredData);
                console.log("Filtered Data", newFilteredData);


            });
            console.log(newFilteredData);
            setFilteredData(newFilteredData);
        }

        // console.log(filteredData);

    }, [filters]);

    return ( 
        <div className={styles.displayCardContainer}>
            <div className={styles.topSection}>
                <P>{count + " results"}</P>
                <P className={styles.pageCount}>{`(Page ${pageId} of ${numOfPaginationPages})`}</P>
            </div>
            <div className={styles.displayCardBody}>
                <div className={styles.displayCards}>
                {
                    filteredData.map((singleData) => 
                    {
                        return (
                        <Card 
                            key={uuidv4()}
                            title={singleData.listing_title}
                            ownerName={singleData.profile.fullname}
                            moreInfoLink={"/roommate-request/"+singleData.id}
                            sliderImages = {singleData.request_images}
                            thumbnail = {singleData.profile.image_url}
                        />)
                    })
                }
                </div>
                {pagination && (
                     <div className={styles.bottom}>
                     <div className={styles.pagination}>
                        <Link to={prevPaginationUrl}>
                            <span className={styles.paginationBtn}><Img src={backBtn} /></span>
                        </Link>
                        <span className={styles.paginationContent}>
                            {paginationPagesArray.map((num) => 
                            {
                                return  <span className={styles.paginationLinks} key={uuidv4()}><Link to={`?page=${num}`}>{num}</Link></span>
                            })}
                            <span className={styles.paginationLinks}>...</span>
                            <span className={styles.paginationLinks}><Link to={`?page=${numOfPaginationPages}`}>{numOfPaginationPages}</Link></span>
                        </span>
                        <Link to={nextPaginationUrl}>
                            <span className={styles.paginationBtn}><Img src={nextBtn} /></span>
                        </Link>
                        </div>
                 </div>
                )}
               
            </div>
             
        </div>
       
     );
}
 
export default DisplayCards;