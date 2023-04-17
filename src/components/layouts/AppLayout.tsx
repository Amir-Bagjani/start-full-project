import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { user } from './user';

// const user: any = null;
// const user = {name: "saeed"};

export const AppLayout = () => {
  if (!!!user?.name) return <Navigate to='/login' />;

  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/transfer'>Transfer</NavLink>
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
      <Outlet />
    </div>
  );
};
