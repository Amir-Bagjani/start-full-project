import { useState } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

//components
import { DocumentTitle, PortalLoadingComponent } from 'modules/common/components';
import { ExpenseDetailTable, ExpenseInfo, PrintHeader, SignPrint } from '../components';

//utils
import { getStateFromBrowserStorage } from '../utils';
import { useExtraPrintExpenseAPI, usePrintExpensesAPI } from '../hooks';

const styles = {
  wrapper: {
    '& > *': { width: 1 },
    direction: 'ltr',
    bgcolor: 'background.paper',
    border: 1,
    p: 1,
  },
} as const;

const PrintPage = () => {
  const { t } = useTranslation();

  const [state] = useState(() => getStateFromBrowserStorage());

  const { data: singleExpense, isInitialLoading: isLoadingSingleExpense } = usePrintExpensesAPI(
    {
      expenseIds: state.id,
    },
    {
      enabled: !!state?.id,
    },
  );

  const { data: extraPrintData, isInitialLoading: isExtraPrintDataLoading } =
    useExtraPrintExpenseAPI(
      {
        expenseIds: state.id,
      },
      {
        enabled: !!state.id,
      },
    );

  return (
    <DocumentTitle title={t('PrExpensePrint') as string}>
      {isExtraPrintDataLoading && <PortalLoadingComponent />}
      <Stack spacing={5} alignItems='center' sx={styles.wrapper}>
        {/* header */}
        <PrintHeader />

        {/* info */}
        <ExpenseInfo data={singleExpense} extraPrintData={extraPrintData} />

        {/* info detail table */}
        <ExpenseDetailTable
          data={singleExpense}
          loading={isLoadingSingleExpense}
          extraPrintData={extraPrintData}
        />

        {/* adjuster comments */}
        <SignPrint />
      </Stack>
    </DocumentTitle>
  );
};

export default PrintPage;
