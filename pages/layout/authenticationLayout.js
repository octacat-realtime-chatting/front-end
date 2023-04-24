import React from 'react';
import ContainerToast from '../../components/containerToast';

export default function AuthenticationLayout({ children }) {
  return (
    <>
      <ContainerToast />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 min-h-screen max-h-screen">
        <div className="hidden sm:hidden md:hidden lg:block lg:col-span-1 bg-[#393E46] p-10 relative overflow-hidden">
          <div className="flex flex-row items-center gap-3">
            <div className="h-7 w-7 rounded-full border-4 border-[#D6D8DA] flex items-center justify-center">
              <div className="bg-[#D6D8DA] h-3 w-3 rounded-full" />
            </div>
            <span className="uppercase text-[#D6D8DA] dm-mono font-medium text-xl">octacat chatting</span>
          </div>

          <div className="h-full flex items-center justify-center pb-14">
            <div className="relative">
              <img src="/images/circle.svg" alt="rounded" />

              <div className="absolute bottom-5 left-0 h-full flex items-center justify-center w-full">
                <img src="/images/phones.svg" alt="rounded" />
              </div>

              <div className="absolute -bottom-64 -right-52 h-full flex items-center justify-end w-full">
                <img src="/images/strip.svg" alt="rounded" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-16 text-[#C2C4C7]">
            <span className="text-lg capitalize dm-mono">
              hey
              <br />
              welcome to
              <br />
              octacat chatting
            </span>
          </div>
        </div>

        <div className="col-span-1">{children}</div>
      </div>
    </>
  );
}
