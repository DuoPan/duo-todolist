export const arrayMove = (arr, fromIndex, toIndex) => {
  let result = [...arr];
  var element = result[fromIndex];
  result.splice(fromIndex, 1);
  result.splice(toIndex, 0, element);
  return result;
};
