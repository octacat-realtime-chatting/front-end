import { useRouter } from 'next/router';
import { RiLoader4Fill } from 'react-icons/ri';

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push('/login');
  }, 6000);

  return (
    <div className="h-screen flex items-center justify-center">
      <RiLoader4Fill size={50} className="animate-spin h-56 w-56" />
    </div>
  );
}
