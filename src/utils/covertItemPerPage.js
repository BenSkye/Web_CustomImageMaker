export const convertTablePerPage = (data, numPerPage) => {
  const pages = [];

  if (!data) {
    data = [];
  }
  
  for (let i = 0; i < data.length; i += numPerPage) {
    const page = data.slice(i, i + numPerPage);
    pages.push(page);
  }

  return pages;
}