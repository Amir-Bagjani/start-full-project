import { useUser } from 'modules/common/hooks';
import React from 'react';

const LoginPage = () => {
  const { login } = useUser();
  return (
    <>
      <div>LoginPage</div>
      <div>
        <button onClick={() => login({ name: 'ali', role: 'admin' })}>Ali - Admin</button>
        <button onClick={() => login({ name: 'amir', role: 'insurer' })}>amir - insurer</button>
      </div>
    </>
  );
};

export default LoginPage;
