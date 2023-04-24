import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { asyncLogin } from '../../redux/reducers/authSlices';
import AuthenticationLayout from '../layout/authenticationLayout';

export default function Login() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await dispatch(asyncLogin(data));
      console.log(response?.payload?.status);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">loginasdfasdfasdf</span>
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
                <div className="flex flex-row items-center gap-1 text-sm font-medium ">
                  <span className="text-[#5D6168]">Don’t Have Account ?</span>
                  <Link href="/register">
                    <span className="text-[#00ADB5]">Sign Up</span>
                  </Link>
                </div>

                <Link href="/forgotpassword">
                  <span className="text-[#00ADB5] text-sm capitalize font-medium">forgot password ?</span>
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            sign in
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
