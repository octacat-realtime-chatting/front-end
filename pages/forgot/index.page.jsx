import { BiLoaderCircle } from 'react-icons/bi';
import AuthenticationLayout from '../layout/authenticationLayout';
import { useSendEmail } from './hook/useSendEmail';

export default function SendEmail() {
  const { errors, loadingAsyncForgot, onSubmit, register } = useSendEmail();

  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={onSubmit}>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">forgot password</span>
              <small className="text-[#7C7C7C] text-base">Password sent to email</small>
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[25px]">
                <input
                  {...register('email')}
                  type="email"
                  className="dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                  placeholder="email"
                />
                <p>{errors?.email?.message}</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#00ADB5] uppercase text-base font-semibold dm-sans text-[#EEEEEE] py-2 rounded-[10px] shadow-login"
          >
            {loadingAsyncForgot ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'send'}
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
