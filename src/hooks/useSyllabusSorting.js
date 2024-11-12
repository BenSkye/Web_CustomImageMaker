import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchSort } from '@/core/store/syllabus-management/syllabusSort';
import { setData } from '@/core/store/syllabus-management/syllabusData';

function useSyllabusSorting(currentPage = 0, rowPerPage = 5, tagInputValue = '') {
  const data = useSelector((state) => state.syllabusData.data);
  const dispatch = useDispatch();

  const [typeSort, setTypeSort] = useState({
    topicName: { active: false, asc: false },
    codeName: { active: false, asc: false },
    createdDate: { active: false, asc: false },
    duration: { active: false, asc: false },
    createdBy: { active: false, asc: false },
  });

  const handleSortToggle = (property) => {
    setTypeSort((prevStates) => {
      const newStates = { ...prevStates };
      for (const prop in newStates) {
        if (prop === property) {
          newStates[prop] = {
            active: true,
            asc: !prevStates[prop].asc,
          };
        } else {
          newStates[prop] = {
            active: false,
            asc: false,
          };
        }
      }
      return newStates;
    });
  };

  useEffect(() => {
    const activeAttributes = [];

    for (const attributeName in typeSort) {
      if (typeSort[attributeName].active === true) {
        activeAttributes.push({
          attribute: attributeName,
          asc: typeSort[attributeName].asc,
        });
      }
    }

    if (activeAttributes.length === 0) {
      dispatch(setSearchSort([]));
    } else {
      dispatch(setSearchSort(activeAttributes));
    }
  }, [typeSort, dispatch]);

  return {
    typeSort,
    setTypeSort,
    handleSortToggle,
    // ... (other functions and states)
  };
}

export default useSyllabusSorting;
