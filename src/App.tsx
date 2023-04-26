import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { routes } from './routes/routes';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App(): JSX.Element {
  return (
    <CacheProvider value={cacheRtl}>
      <RouterProvider router={routes} />;
    </CacheProvider>
  );
}

export default App;
