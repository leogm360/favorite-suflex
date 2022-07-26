export const settings = {
  secret: process.env.SIGNING_KEY,
  SignOptions: { expiresIn: '1d' },
};
