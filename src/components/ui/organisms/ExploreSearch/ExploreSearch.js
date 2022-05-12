import { useState, useEffect } from "react";
import SearchOptions from "../../molecules/Search/SearchOptions/SearchOptions";
import styles from "./ExploreSearch.module.css";
import DisplaySearchTags from "../../molecules/Search/DisplaySearchTags/DisplaySearchTags";
const ExploreSearch = () => {
  const [tagKeys, updateTagKeys] = useState({});

  const filters = [
    {
      key: 1,
      label: "Gender",
      name: "gender",
      data:
      [
          {key: 1, label: "Male", value: "Male"},
          {key: 2, label: "Female", value: "Female"},
      ]
    },
    {
      key: 2,
      label: "Religion",
      name: "religion",
      data:
      [
          {key: 1, label: "Christian", value: "Christian"},
          {key: 2, label: "Muslim", value: "Muslim"},
      ]
    },
    {
      key: 3,
      label: "Room Type",
      name: "room_type",
      data:
      [
          {key: 1, label: "Self contain", value: "Self contain"},
          {key: 2, label: "3 bedroom flat", value: "3 bedroom flat"},
      ]
    },
    {
      key: 4,
      label: "Personality",
      name: "personality",
      data:
      [
          {key: 1, label: "Introvert", value: "Introvert"},
          {key: 2, label: "Extrovert", value: "Extrovert"},
      ]      
    },
    {
      key: 5,
      label: "Price",
      name: "price",
      data:
      [
          {key: 1, label: "< #100k", value: "< #100k"},
          {key: 2, label: "#100k - #250k", value: "#100k - #250k"},
          {key: 3, label: "#250k - #500k", value: "#250k - #500k"},
          {key: 4, label: "> #500k", value: "> #500k"},
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
