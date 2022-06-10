import { useState, useEffect } from "react";
import styles from "./ExploreSearch.module.css";
import SearchOptions from "../../molecules/Search/SearchOptions/SearchOptions";
import DisplaySearchTags from "../../molecules/Search/DisplaySearchTags/DisplaySearchTags";
import {v4 as uuidv4} from 'uuid';

const ExploreSearch = ({getTagKeys}) => {
  const [tagKeys, updateTagKeys] = useState({});

  const filters = [
    {
      key: uuidv4(),
      label: "Gender",
      name: "gender",
      data:
      [
          {key: uuidv4(), label: "Gender", value: ""},
          {key: uuidv4(), label: "Male", value: "Male"},
          {key: uuidv4(), label: "Female", value: "Female"},
      ]
    },
    {
      key: uuidv4(),
      label: "Religion",
      name: "religion",
      data:
      [
          {key: uuidv4(), label: "Religion", value: ""},
          {key: uuidv4(), label: "Christian", value: "Christianity"},
          {key: uuidv4(), label: "Muslim", value: "Islam"},
      ]
    },
    {
      key: uuidv4(),
      label: "Room Type",
      name: "room_type",
      data:
      [
          {key: uuidv4(), label: "Room Type", value: ""},
          {key: uuidv4(), label: "Self contain", value: "Self contain"},
          {key: uuidv4(), label: "2 Bedroom Flat", value: "2 Bedroom Flat"},
          {key: uuidv4(), label: "3 bedroom flat", value: "3 bedroom flat"},
          {key: uuidv4(), label: "Shortlet", value: "Shortlet"},
          {key: uuidv4(), label: "Single Room Apartment", value: "Single Room Apartment"}
      ]
    },
    {
      key: uuidv4(),
      label: "Personality",
      name: "personality",
      data:
      [
          {key: uuidv4(), label: "Personality", value: ""},
          {key: uuidv4(), label: "Introvert", value: "INTROVERT"},
          {key: uuidv4(), label: "Extrovert", value: "EXTROVERT"},
      ]      
    },
    {
      key: uuidv4(),
      label: "Price",
      name: "price",
      data:
      [
          {key: uuidv4(), label: "Price", value: ""},
          {key: uuidv4(), label: "< #100k", value: "< #100k"},
          {key: uuidv4(), label: "#100k - #250k", value: "#100k - #250k"},
          {key: uuidv4(), label: "#250k - #500k", value: "#250k - #500k"},
          {key: uuidv4(), label: "> #500k", value: "> #500k"},
      ] 
    },
  ];

  const showSelectTagsOnExplorePage = (data) => 
  {
    var name = data[0];
    var value = data[1];
    updateTagKeys({ ...tagKeys, [name]: value });
  };

  const removeSearchTag = (data) => 
  {
    updateTagKeys((tagKeys) => 
    {
      delete tagKeys[data[0]];
      return {...tagKeys}
    });

  };

  useEffect(() => 
  {
    getTagKeys({...tagKeys});
    
  }, [tagKeys])

  return (
    <div className={styles.exploreSearch}>
      <p className={styles.queryTitle}>Sort By</p>
      <SearchOptions
        filters={filters}
        showSelectTagsOnExplorePage={showSelectTagsOnExplorePage}
      />
      {
        <DisplaySearchTags
          tags={tagKeys} 
          removeSearchTag={removeSearchTag}
        />
      }
    </div>
  );
};

export default ExploreSearch;
