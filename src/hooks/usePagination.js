// usePagination.js
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@/core/store/syllabus-management/paginationPage';
import syllabusService from '@/core/services/SyllabusServices/syllabusController.js';

function usePagination(
  currentPage,
  rowPerPage,
  tagInputValue,
  setData,
  setTotalPage,
  totalPage,
  setRowPerPage,
  sort,
  objRange
) {
  const dispatch = useDispatch();
  const changePos = async (step, pageIsValid) => {
    if (pageIsValid) {
      let newCurrentPage;
      if (step === 0) {
        if (currentPage % 3 === 1) {
          newCurrentPage = currentPage - 1;
        } else if (currentPage % 3 === 2) {
          newCurrentPage = currentPage - 2;
        }
      } else if (step === 1) {
        if (currentPage % 3 === 0) {
          newCurrentPage = currentPage + step;
        } else if (currentPage % 3 === 2) {
          newCurrentPage = currentPage - step;
        }
      } else if (step === 2) {
        if (currentPage % 3 === 0) {
          newCurrentPage = currentPage + step;
        } else if (currentPage % 3 === 1) {
          newCurrentPage = currentPage + 1;
        }
      }
      dispatch(setCurrentPage(newCurrentPage));
      // Make API call to getSyllabusByPage
      try {
        syllabusService
          .getSyllabusByPage(newCurrentPage, rowPerPage, tagInputValue, sort, objRange)
          .then((data) => {
            // Update your data state here
            dispatch(setData(data.content));
            dispatch(setTotalPage(data.totalPage));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Error fetching data:', error);
      }
    }
  };

  const checkValidPos = (currentPage) => {
    if (rowPerPage * currentPage <= rowPerPage * totalPage + 1) {
      return true;
    }

    return false;
  };

  const changeStepSkip = async (step) => {
    let newCurrentPage;

    if (step === -1) {
      newCurrentPage = 3 * Math.floor(currentPage / 3) - 3;
      if (newCurrentPage < 0) {
        newCurrentPage = 0;
      }
    } else if (step === 1) {
      newCurrentPage = 3 * Math.floor(currentPage / 3) + 3;
      const lastPage = totalPage - 1;
      if (newCurrentPage > lastPage) {
        newCurrentPage = lastPage;
        dispatch(setCurrentPage(newCurrentPage));
      }
    }

    dispatch(setCurrentPage(newCurrentPage));

    // Make API call to getSyllabusByPage
    try {
      syllabusService
        .getSyllabusByPage(newCurrentPage, rowPerPage, tagInputValue, sort, objRange)
        .then((data) => {
          // Update your data state here
          dispatch(setData(data.content));
          dispatch(setTotalPage(data.totalPage));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Error fetching data:', error);
    }
  };

  const checkValidPosJumpBack = () => {
    return 3 * Math.floor(currentPage / 3) > 0;
  };

  const checkValidPosJumpNext = () => {
    return 3 * Math.floor(currentPage / 3) + 3 < totalPage;
  };

  const handleRowPerPage = async (row) => {
    dispatch(setCurrentPage(0));
    dispatch(setRowPerPage(row));
    try {
      const newData = await syllabusService.getSyllabusByPage(
        currentPage,
        row,
        tagInputValue,
        sort,
        objRange
      );
      // Update your data state here
      dispatch(setData(newData.content));
      dispatch(setTotalPage(newData.totalPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return {
    currentPage,
    rowPerPage,
    changePos,
    checkValidPosJumpBack,
    checkValidPosJumpNext,
    checkValidPos,
    changeStepSkip,
    handleRowPerPage,
  };
}

export default usePagination;
