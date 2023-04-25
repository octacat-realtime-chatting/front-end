import { NotifToastBerhasil, NotifToastGagal } from '@/components';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { asyncLogin, authState } from '@/redux/reducers/authSlices';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const useLogin = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { push } = useRouter();
  const { loadingAsyncLogin } = useSelector(authState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await dispatch(asyncLogin(data));

      if (response?.payload?.status) {
        NotifToastBerhasil(response?.payload?.message);
        localStorage.setItem(response?.payload?.data?.token, 'token');

        setTimeout(() => {
          push('/home');
        }, 1500);
      }

      if (!response?.payload?.status) {
        NotifToastGagal(response?.error?.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    register,
    errors,
    loadingAsyncLogin,
    visible,
    setVisible,
    onSubmit: handleSubmit(onSubmit),
  };
};
