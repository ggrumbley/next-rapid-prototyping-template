import React from 'react';
import { Auth, Card, Space, Typography } from '@supabase/ui';

import { supabase } from 'utils/initSupabase';

export const AuthGuard: React.FC = ({ children }) => {
  const { user } = Auth.useUser();

  return (
    <>
      {user ? (
        children
      ) : (
        // <div className="w-full h-full flex justify-center items-center p-4">
        <Card>
          <Space direction="vertical" size={8}>
            <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
            <Typography.Title level={2}>Welcome to Rad List</Typography.Title>
            <Auth
              supabaseClient={supabase}
              providers={['github']}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </Space>
        </Card>

        // </div>
      )}
    </>
  );
};
