export const sortData = (arr, property, typeSort) => {
  const compareFn = (a, b) => {
    let result;

    if (property === 'id') {
      result = a[property] - b[property];
    } else if (property === 'dob') {
      result = new Date(a[property]) - new Date(b[property]);
    } else if (property === 'male') {
      const boolA = a[property] ? 1 : 0;
      const boolB = b[property] ? 1 : 0;
      result = boolA - boolB;
    } else {
      result = a[property].localeCompare(b[property]);
    }

    return typeSort === 'asc' ? result : -result;
  };

  return arr.slice().sort(compareFn);
};
