import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingProvider } from 'context/SettingContext';

import './utils/configuration/languages/i18n';
import { MUIThemeProvider } from 'theme';

import { UserProvider } from 'context/UserContext';
import { RouteWrapper } from 'routes/RouteWrapper';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SettingProvider>
          <MUIThemeProvider>
            <RouteWrapper />
          </MUIThemeProvider>
        </SettingProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
