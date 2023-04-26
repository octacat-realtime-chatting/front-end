import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import nookies from 'nookies';

const useDeferredGo = () => {
  const [config, setConfig] = useState(undefined);

  const cb = useCallback(
    (props) => {
      if (!config) {
        setConfig(props);
      }
    },
    [config],
  );

  return cb;
};

// eslint-disable-next-line react/display-name
export const withAuth = (Component) => (props) => {
  const [token] = useState(nookies.get('token'));
  const router = useRouter();

  console.log(token);

  const deferredGo = useDeferredGo();

  if (Object.values(token).length < 1) {
    deferredGo(router.push('/login'));
  }

  return <Component {...props} />;
};
