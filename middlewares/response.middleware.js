const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const { message, status } = res.err;
    console.error("Error:", message);
    return res.status(status || 500).json({ error: true, message });
  }
  
  console.log("responseMiddleware res.data", res.data);
  return res.status(200).json(res.data);
};

export { responseMiddleware };

// TODO: Implement middleware that returns result of the query
