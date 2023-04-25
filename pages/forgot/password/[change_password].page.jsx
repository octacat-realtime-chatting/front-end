import { authState } from '@/redux/reducers/authSlices';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationLayout from '../../layout/authenticationLayout';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { token } = query;
  const [visible, setVisible] = useState(false);
  const { loadingAsyncForgot } = useSelector(authState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">change password</span>
              <small className="text-[#7C7C7C] text-base">Enter new password</small>
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[20px]">
                <div className="relative">
                  <input
                    {...register('email')}
                    type={visible ? 'text' : 'password'}
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <button type="button" className="absolute top-2.5 right-3" onClick={() => setVisible(!visible)}>
                    {visible ? (
                      <AiOutlineEyeInvisible size={20} color="#818489" />
                    ) : (
                      <AiOutlineEye size={20} color="#818489" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    {...register('email')}
                    type={visible ? 'text' : 'password'}
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <button type="button" className="absolute top-2.5 right-3" onClick={() => setVisible(!visible)}>
                    {visible ? (
                      <AiOutlineEyeInvisible size={20} color="#818489" />
                    ) : (
                      <AiOutlineEye size={20} color="#818489" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            {loadingAsyncForgot ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'change'}
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
