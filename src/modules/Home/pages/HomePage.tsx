import { APPLICATION_ROUTES } from 'routes/APPLICATION_ROUTES';

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <pre dir='ltr'>{JSON.stringify(APPLICATION_ROUTES, null, 2)}</pre>
    </>
  );
};

export default HomePage;
