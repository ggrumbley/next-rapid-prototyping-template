import { Auth } from '@supabase/ui';

import { supabase } from '../utils';
import { StoreProvider as CounterProvider } from '../features/counter/Counter.state';
import type { AppProps } from 'next/app';

import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <CounterProvider>
        <Component {...pageProps} />
      </CounterProvider>
    </Auth.UserContextProvider>
  );
};

export default MyApp;
