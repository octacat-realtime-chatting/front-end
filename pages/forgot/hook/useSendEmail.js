import { NotifToastBerhasil, NotifToastGagal } from '@/components';
import { asyncForgot, authState } from '@/redux/reducers/authSlices';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export const useSendEmail = () => {
  const dispatch = useDispatch();
  const { loadingAsyncForgot } = useSelector(authState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await dispatch(asyncForgot(data));
      if (response?.payload?.status) {
        NotifToastBerhasil(response?.payload?.message);
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
    onSubmit: handleSubmit(onSubmit),
    errors,
    loadingAsyncForgot,
  };
};
