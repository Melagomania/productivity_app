module.exports = function (categoryId) {
  categoryId += '';
  switch (categoryId) {
    case '1':
      return 'work';
      break;
    case '2':
      return 'education';
      break;
    case '3':
      return 'hobby';
      break;
    case '4':
      return 'sport';
      break;
    case '5':
      return 'other';
      break;
  }
};
