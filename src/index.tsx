import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingProvider } from 'context/SettingContext';

import './utils/configuration/languages/i18n';
import { MUIThemeProvider } from 'theme';
import { RouterProvider } from 'react-router-dom';
import { routes } from 'routes/routes';
import { UserProvider } from 'context/UserContext';

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
            <RouterProvider router={routes} />
          </MUIThemeProvider>
        </SettingProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
