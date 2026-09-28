// Response formatter helper function
const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
  };
};

module.exports = {
  formatResponse,
};