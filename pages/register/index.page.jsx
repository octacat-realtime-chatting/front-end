import Link from 'next/link';
import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import AuthenticationLayout from '../layout/authenticationLayout';
import { useRegister } from './hook/userRegister';

export default function Register() {
  const { errors, loadingAsyncRegister, onSubmit, register, setVisible, visible } = useRegister();

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={onSubmit}>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">sign up</span>
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-1">
                  <input
                    {...register('email')}
                    type="email"
                    name="email"
                    className="dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="email"
                  />
                  <small className="text-xs text-red-600 capitalize">{errors.email?.message}</small>
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    {...register('name')}
                    type="text"
                    name="name"
                    className="dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="name"
                  />
                  <small className="text-xs text-red-600 capitalize">{errors.name?.message}</small>
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    {...register('username')}
                    type="text"
                    name="username"
                    className="dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="username"
                  />
                  <small className="text-xs text-red-600 capitalize">{errors.username?.message}</small>
                </div>

                <div className="relative felx flex-col gap-1">
                  <input
                    {...register('password')}
                    type={visible ? 'text' : 'password'}
                    name="password"
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <small className="text-xs text-red-600 capitalize">{errors.password?.message}</small>

                  <button type="button" className="absolute top-2.5 right-3" onClick={() => setVisible(!visible)}>
                    {visible ? <AiOutlineEyeInvisible size={20} color="#818489" /> : <AiOutlineEye size={20} color="#818489" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 text-sm font-medium ">
                  <span className="text-[#5D6168]">Have Account ?</span>
                  <Link href="/login">
                    <span className="text-[#00ADB5]">Sign</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            {loadingAsyncRegister ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'sign up'}
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
