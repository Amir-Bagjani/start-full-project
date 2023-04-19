import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { user } from './user';
import { useTranslation } from 'react-i18next';

// const user: any = null;
// const user = {name: "saeed"};

export const AppLayout = () => {
  const { t, i18n } = useTranslation();

  if (!!!user?.name) return <Navigate to='/login' />;

  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
          <li>
            <NavLink to='/'>{t('Home')}</NavLink>
          </li>
          <li>
            <NavLink to='/transfer'>{t('Transfer')}</NavLink>
          </li>
          <li>
            <NavLink to='/folder'>Folder</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/report'>Report</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/messages'>Messages</NavLink>
          </li>
          <li>
            <NavLink to='/counter'>Counter</NavLink>
          </li>
          <li>
            <NavLink to='/contract'>Contract</NavLink>
          </li>
          <li>
            <NavLink to='/adjustment'>Adjustment</NavLink>
          </li>
          <li>
            <NavLink to='/print'>Print</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <button onClick={() => i18n.changeLanguage('en')}>En</button>
        <button onClick={() => i18n.changeLanguage('fa')}>Fa</button>
        <button onClick={() => i18n.changeLanguage('ar')}>Ar</button>
      </div>
      <Outlet />
    </div>
  );
};
