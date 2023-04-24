import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { asyncLogin, authState } from '../../redux/reducers/authSlices';
import AuthenticationLayout from '../layout/authenticationLayout';
import { NotifToastBerhasil, NotifToastGagal } from '../../components/notify';

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [visible, setVisible] = useState(false);
  const { loadingAsyncLogin } = useSelector(authState);

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await dispatch(asyncLogin(data));
      console.log(response);
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

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">login</span>
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[25px]">
                <input
                  {...register('email')}
                  type="email"
                  className="dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                  placeholder="email"
                />
                <div className="relative">
                  <input
                    {...register('password')}
                    type={visible ? 'text' : 'password'}
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <button type="button" className="absolute top-2.5 right-3" onClick={() => setVisible(!visible)}>
                    {
                      visible ? <AiOutlineEyeInvisible size={20} color="#818489" /> : <AiOutlineEye size={20} color="#818489" />
                    }
                  </button>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 text-xs sm:text-sm font-medium">
                  <span className="text-[#5D6168]">Don’t Have Account ?</span>
                  <Link href="/register">
                    <span className="text-[#00ADB5]">Sign Up</span>
                  </Link>
                </div>

                <Link href="/forgotpassword">
                  <span className="text-[#00ADB5] text-xs sm:text-sm capitalize font-medium">forgot password ?</span>
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            { loadingAsyncLogin ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'sign in' }
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
