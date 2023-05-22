import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//components
import { RouteWrapper } from 'routes/RouteWrapper';
import { UserProvider } from 'context/UserContext';
import { SettingProvider } from 'context/SettingContext';

//utils
import { MUIThemeProvider } from 'theme';
import './utils/configuration/languages/i18n';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
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
            <Toaster toastOptions={{ duration: 3000 }} />
            <ReactQueryDevtools initialIsOpen={false} />
          </MUIThemeProvider>
        </SettingProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
