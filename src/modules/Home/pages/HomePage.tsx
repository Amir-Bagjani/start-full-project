import { useBrowserstorageState, useSettings } from 'modules/common/hooks';
import { APPLICATION_ROUTES } from 'routes/APPLICATION_ROUTES';

const chekValue = (value: number) => {
  if (typeof value === 'number' && value >= 0 && value <= 3) return value;
  return 0;
};

const HomePage = () => {
  const [count, setCount] = useBrowserstorageState('kkeeyy', 0, 'localStorage', chekValue);
  const { toggleTheme } = useSettings();
  // const [v, setV] = useCookieState('werwe', 10);

  // const f = useCallback((e: any) => {
  //   setV(e);
  // }, [setV]);

  return (
    <>
      <div>HomePage</div>
      <button onClick={() => setCount((p) => p + 1)}>count - {count} </button>
      <button onClick={toggleTheme}>toggle theme</button>
      <pre dir='ltr'>{JSON.stringify(APPLICATION_ROUTES, null, 2)}</pre>
    </>
  );
};

export default HomePage;
