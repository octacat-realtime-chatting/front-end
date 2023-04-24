import apiServices from './apiServices';

const userServices = {
  register: async ({
    avatar, email, name, username, password,
  }) => {
    const { data: { status, message, errors } } = await apiServices.post('/auth/register', {
      avatar, email, name, username, password,
    });

    return { status, message, errors };
  },

  login: async ({
    email, password,
  }) => {
    const { data: { status, message, errors } } = await apiServices.post('/auth/login', {
      email, password,
    });

    return { status, message, errors };
  },
};

export default userServices;
