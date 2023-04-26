import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import AuthenticationLayout from '../../layout/authenticationLayout';
import { useChangePassword } from '../hook/useChangePw';

export default function ChangePassword() {
  const { errors, loadingAsyncChange, onSubmit, register, setVisible, visible } = useChangePassword();
  
  return (
    <AuthenticationLayout>
      <div className="flex items-center justify-center px-10 sm:px-36 pb-28 h-full">
        <form className="flex flex-col gap-[25px] w-full" onSubmit={onSubmit}>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <span className="text-[#393E46] text-3xl uppercase dm-mono font-medium">change password</span>
              <small className="text-[#7C7C7C] text-base">Enter new password</small>
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[20px]">
                <div className="relative flex flex-col gap-1">
                  <input
                    {...register('new_password')}
                    type={visible ? 'text' : 'password'}
                    className="w-full dm-sans border-2 border-[#A6A8AB] focus:outline-none bg-inherit rounded-[10px] py-2 px-2.5 text-sm font-normal placeholder:text-sm placeholder:text-[#818489] text-[#818489] placeholder:capitalize"
                    placeholder="password"
                  />
                  <small className="text-xs text-red-600 capitalize">{errors.new_password?.message}</small>
                  
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
            {loadingAsyncChange ? <BiLoaderCircle size={20} className="mx-auto animate-spin h-5 w-5" /> : 'change'}
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
}
