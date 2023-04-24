import '../styles/globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingBar } from 'react-redux-loading-bar';
import { injectStore as injectStoreToApiService } from '../services/apiServices';
import store, { persistor } from '../redux/store';

injectStoreToApiService(store);

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingBar />}
        persistor={persistor}
      >
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}
