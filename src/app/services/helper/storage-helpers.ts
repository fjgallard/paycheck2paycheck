function convertObjectToArray(object: Object) {
  const keys = Object.keys(object);
  return keys.map(key => object[key])
}

function convertArrayToObject(array: any[]) {
  return Object.assign({}, array);
}

function convertStringToObject(str: string) {
  let obj = {};
  if (str) {
    obj = JSON.parse(str);
  }

  return obj;
}