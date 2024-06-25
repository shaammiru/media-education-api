const responseBody = (message: String, error: any, data: any) => {
  return {
    message: message,
    error: error,
    data: data,
  };
};

export default responseBody;
