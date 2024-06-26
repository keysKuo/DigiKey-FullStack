function toQueryString(collection, json) {
    const queryString = [];
  
    function buildQueryString(prefix, obj) {
      if (Array.isArray(obj)) {
        obj.forEach((value, index) => {
          buildQueryString(`${prefix}[${index}]`, value);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            buildQueryString(`${prefix}[${key}]`, obj[key]);
          } else {
            buildQueryString(`${prefix}[${key}]`, obj[key]);
          }
        });
      } else {
        queryString.push(`${prefix}=${obj}`);
      }
    }
  
    Object.keys(json).forEach(key => {
      buildQueryString(key, json[key]);
    });
  
    return `${collection}?${queryString.join('&')}`;
  }
  
  // Chuyển đổi JSON thành query string
  export default toQueryString;

  