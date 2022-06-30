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

const DisplayCards = ({data, pagination,  filters = {}}) => 
{
    const [filteredData, setFilteredData] = useState(data);
    // const [count, setCount] = useState(0);
    const count = filteredData.length;
    const numOfPaginationPages = count > 0 ? Math.ceil(count/15) : 1;

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


    useEffect(() => 
    {

        if(filters)
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
    
                    let tempFilteredData = [];
                    unfilteredData.forEach((datum) => 
                    {
                        if((filterKey === 'gender') || (filterKey === 'religion')  || (filterKey ===  'personality'))
                        {
                            
                            if(datum.profile[filterKey].toLowerCase() == filters[filterKey].toLowerCase()) tempFilteredData.push(datum)            
                        }
        
                        if(filterKey === 'room_type')
                        {
                            if(datum[filterKey].toLowerCase() == filters[filterKey].toLowerCase()) tempFilteredData.push(datum);
                        }

                        if(filterKey == 'price')
                        {
                            let rent = datum["rent_per_person"];

                            switch(filters[filterKey])
                            {
                                case("< #100k"):
                                {
                                    if(rent < 100000) tempFilteredData.push(datum);
                                    break;
                                }

                                case("#100k - #250k"):
                                {
                                    if((rent > 100000) && (rent < 250000) )tempFilteredData.push(datum);
                                    break;
                                }

                                case("#250k - #500k"):
                                {
                                    if((rent > 250000) && (rent < 500000) )tempFilteredData.push(datum);
                                    break;
                                }

                                case("> #500k"):
                                {
                                    if(rent > 500000) tempFilteredData.push(datum);
                                    break;
                                }

                            }
                        }
                    });
                    newFilteredData = tempFilteredData;
                })

                // console.log(newFilteredData);
                setFilteredData(newFilteredData);
            }
       
        }
       
        // setCount(filteredData.length); 
        // console.log(filteredData);

    }, [filters, data]);

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
                            data={singleData}
                            moreInfoLink={"/roommate-request/"+singleData.id}
                        />)
                    })
                }
                </div>
                {(pagination && numOfPaginationPages > 1)&& (
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