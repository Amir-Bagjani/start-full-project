import { useBrowserstorageState } from 'modules/common/hooks';
import { APPLICATION_ROUTES } from 'routes/APPLICATION_ROUTES';

const chekValue = (value: number) => {
  if (typeof value === 'number' && value >= 0 && value <= 3) return value;
  return 0;
};

const HomePage = () => {
  const [count, setCount] = useBrowserstorageState('kkeeyy', 0, 'localStorage', chekValue);
  // const { toggleStretch } = useSettings()

  return (
    <>
      <div>HomePage</div>
      <button onClick={() => setCount((p) => p + 1)}>count - {count} </button>
      {/* <button onClick={toggleStretch}>toggleStretch</button> */}
      <pre dir='ltr'>{JSON.stringify(APPLICATION_ROUTES, null, 2)}</pre>
    </>
  );
};

export default HomePage;
