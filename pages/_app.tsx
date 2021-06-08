import { Auth } from '@supabase/ui';

import { supabase } from '../utils';
import { StoreProvider as CounterProvider } from '../features/Counter/Counter.state';
import { StoreProvider as QuizProvider } from '../features/Quiz/Quiz.state';
import type { AppProps } from 'next/app';

import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <QuizProvider>
        <CounterProvider>
          <Component {...pageProps} />
        </CounterProvider>
      </QuizProvider>
    </Auth.UserContextProvider>
  );
};

export default MyApp;
