import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ONE_HOUR } from './appConfig/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/config';
import Container from './containers';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LoadingContainer from './containers/StartupContainers/LoadingContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
      onError(err: unknown | Error) {
        // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
        //   return ErrorService.handler({
        //     message: 'You do not have permission to access this data.',
        //   });
        // }
        // ErrorService.handler(err);
        return err;
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
        //   return ErrorService.handler({
        //     message: 'You do not have permission to trigger this action.',
        //   });
        // }
        // ErrorService.handler(err);
        return err;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingContainer />}>
              <Container />
            </Suspense>
          </BrowserRouter>
        </ProSidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
