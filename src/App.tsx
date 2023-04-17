import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';

function App() {
  console.log('yoo prettier ');

  return <RouterProvider router={routes} />;
}

export default App;
