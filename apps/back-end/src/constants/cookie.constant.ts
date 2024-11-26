export const accessTokenCookie = {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 15 * 1000,
};

export const refreshTokenCookie = {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60 * 24 * 7 * 1000,
};
