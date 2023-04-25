import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import AuthenticationLayout from '../layout/authenticationLayout';
import { useLogin } from './hook/useLogin';

export default function Login() {
  const { errors, loadingAsyncLogin, onSubmit, register, setVisible, visible } = useLogin();

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={onSubmit}>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">login</span>
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[25px]">
                <div className="min-w-full">
                  <input
                    {...register('email')}
                    type="email"
                    className="dm-sans border-2 w-full border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="email"
                  />
                  <p className="pt-4">{errors.email?.message}</p>
                </div>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={visible ? 'text' : 'password'}
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <p className="pt-4">{errors.password?.message}</p>

                  <button type="button" className="absolute top-2.5 right-3" onClick={() => setVisible(!visible)}>
                    {visible ? (
                      <AiOutlineEyeInvisible size={20} color="#818489" />
                    ) : (
                      <AiOutlineEye size={20} color="#818489" />
                    )}
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

                <Link href="/forgot/">
                  <span className="text-[#00ADB5] text-xs sm:text-sm capitalize font-medium">forgot password ?</span>
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            {loadingAsyncLogin ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'sign in'}
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
