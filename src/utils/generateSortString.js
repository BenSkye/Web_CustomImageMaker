export const generateSortString = (sortAttributes) => {
  let order = sortAttributes.map((obj) => {
    return `${obj.attribute},${obj.asc ? 'asc' : 'desc'}`;
  })
  if(order === null) order = [];

  return order;
}

export const customParamsSerializer = (params) => {
  return Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}=${value.join("&" + key + "=")}`;
    } else {
      return `${key}=${value}`;
    }
  }).join("&");
}