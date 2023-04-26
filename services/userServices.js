import apiServices from './apiServices';

const userServices = {
  register: async ({ avatar, email, name, username, password }) => {
    const {
      data: { status, message, errors },
    } = await apiServices.post('/auth/register', {
      avatar,
      email,
      name,
      username,
      password,
    });

    return { status, message, errors };
  },

  login: async ({ email, password }) => {
    const {
      data: { status, message, errors, data },
    } = await apiServices.post('/auth/login', {
      email,
      password,
    });

    return {
      status,
      message,
      errors,
      data,
    };
  },

  sendEmail: async ({ email }) => {
    const {
      data: { status, message, errors },
    } = await apiServices.post('/auth/forgotpwd', {
      email,
    });

    return { status, message, errors };
  },

  changePassword: async ({ new_password }, reset_token) => {
    const {
      data: { status, message, errors },
    } = await apiServices.post('/auth/changepwd', {
      new_password,
      reset_token,
    });

    return { status, message, errors };
  },
};

export default userServices;
