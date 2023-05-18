import { Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_NAME } from 'routes/routesName';

const ExpensesPage = () => {
  return (
    <>
      <div>Expenses</div>
      <nav>
        <Stack spacing={2}>
          <Link to={ROUTES_NAME.expenses.add}>go to add page</Link>
          <Link to={ROUTES_NAME.expenses.navigateToDetail(10)}>go to detail page</Link>
          <Link to={ROUTES_NAME.expenses.navigateToPrint([10, 20, 30])}>go to print page</Link>
        </Stack>
      </nav>
    </>
  );
};

export default ExpensesPage;
