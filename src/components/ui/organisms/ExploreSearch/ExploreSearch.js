import { useState, useEffect } from "react";
import SearchOptions from "../../molecules/Search/SearchOptions/SearchOptions";
import styles from "./ExploreSearch.module.css";
import DisplaySearchTags from "../../molecules/Search/DisplaySearchTags/DisplaySearchTags";
const ExploreSearch = () => {
  const [tagKeys, updateTagKeys] = useState({});

  const filters = [
    {
      key: 1,
      name: "Gender",
      values: ["Male", "Female", "Any"],
    },
    {
      key: 2,
      name: "Religion",
      values: ["Christian", "Muslim", "Any"],
    },
    {
      key: 3,
      name: "Room type",
      values: ["Self contain", "3 bedroom flat", "Any"],
    },
    {
      key: 4,
      name: "Personality",
      values: ["Introvert", "Extrovert", "Any"],
    },
    {
      key: 5,
      name: "Price",
      values: ["< #100k", "#100k - #250k", "#250k - #500k", ">#500k", "Any"],
    },
  ];

  const showSelectTagsOnExplorePage = (data) => {
    //     console.log("here");
    //     var temp = tagKeys ? tagKeys : [];
    //     temp[data[0]] = data[1];
    //     updateTagKeys(tagKeys => {
    //         tagKeys[data[0]] = data[1]
    //     });]
    var key = data[0];
    var value = data[1];

    updateTagKeys({ ...tagKeys, [key]: value });
    console.log(tagKeys);
  };

  return (
    <div className={styles.exploreSearch}>
      <p className={styles.queryTitle}>Sort By</p>
      <SearchOptions
        filters={filters}
        showSelectTagsOnExplorePage={showSelectTagsOnExplorePage}
      />
      {console.log(tagKeys)}
      {<DisplaySearchTags tags={tagKeys} />}
    </div>
  );
};

export default ExploreSearch;
