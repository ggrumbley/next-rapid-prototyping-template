import { Auth } from '@supabase/ui';
import { Provider } from 'react-redux';
import { supabase } from '../utils';
import type { AppProps } from 'next/app';

import { store } from '../store';

import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </Provider>
  );
};

export default MyApp;
