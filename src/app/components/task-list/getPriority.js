module.exports = function (priorityId) {
  // categoryId += '';
  switch (priorityId) {
    case '1':
      return 'low-priority';
      break;
    case '2':
      return 'middle-priority';
      break;
    case '3':
      return 'high-priority';
      break;
    case '4':
      return 'urgent-priority';
      break;
  }
};
