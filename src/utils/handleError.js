const handleError = (error, status) => {
  return {
    message: error.message,
    statusCode: status
  };
}