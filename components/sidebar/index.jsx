import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiChatSmile2Line, RiHome3Line, RiSettingsLine } from 'react-icons/ri';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="bg-[#393E46] text-[#B8B9BC] rounded-[15px]">
      <div className="min-w-max max-w-xl w-[80px] max-h-full min-h-full relative flex justify-center">
        <div className="py-8 flex flex-col gap-8">
          <Link href="/home">
            <div
              className={
                router?.pathname === '/home'
                  ? 'bg-[#00ADB5] text-[#EEEEEE] flex justify-center p-2.5 rounded-[10px]'
                  : ''
              }
            >
              <RiHome3Line size={router?.pathname === '/home' ? 20 : 30} />
            </div>
          </Link>
          <Link href="/chat">
            <div
              className={
                router?.pathname === '/chat'
                  ? 'bg-[#00ADB5] text-[#EEEEEE] flex justify-center p-2.5 rounded-[10px]'
                  : 'flex justify-center'
              }
            >
              <RiChatSmile2Line size={router?.pathname === '/chat' ? 20 : 30} />
            </div>
          </Link>
          <Link href="/setting">
            <div
              className={
                router?.pathname === '/setting'
                  ? 'bg-[#00ADB5] text-[#EEEEEE] flex justify-center p-2.5 rounded-[10px]'
                  : 'flex justify-center'
              }
            >
              <RiSettingsLine size={router?.pathname === '/setting' ? 20 : 30} />
            </div>
          </Link>
        </div>
        <div className="absolute bottom-8 left-0 flex justify-center w-full">
          <Image
            src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="profile"
            className="h-14 w-14 rounded-full object-cover border-4 border-[#00ADB5]"
          />
        </div>
      </div>
    </div>
  );
};
