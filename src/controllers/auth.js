import { signin, signup } from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await signup(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully registred user`,
    user: newUser,
  });
};

export const signinController = async (req, res) => {
  const session = await signin(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: `User successfully signed in`,
    data: {
      accessToken: session.accessToken,
    },
  });
};
