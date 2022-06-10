// since we have the same code in register and login, we create a function to manage it
// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // we need res object in order to get res.status

  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // cokkie accessible only through client side script
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true; // by default we have secure flag set to false. if we turn it to true it will be sent with https. we want it only if in production
  }

  res
    .status(statusCode)
    .cookie("accessToken", token, options) // to send the cookie = res.cookie(). it takes the key(name we assign), value( the cookie itself) and options
    .json({ success: true, accessToken: token, data: user });
};

module.exports = sendTokenResponse;
