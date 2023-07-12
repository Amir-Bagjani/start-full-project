import { t } from 'i18next';
import { Box, Container } from '@mui/material';
import { Suspense, useDeferredValue } from 'react';

//components
import { ArchiveExpenses } from '../components/ArchiveExpenses';
import { DocumentTitle, Tabs } from 'modules/common/components';
import { ExpenseFolder } from '../components/FolderExpenses/ExpenseFolder';
import { TrackExpenses } from '../components/TrackExpenses';

//utils
import {
  ADMIN_R,
  EDITOR_R,
  COMPANY_R,
  INSURED_R,
  INSURER_R,
  COUNTER_R,
  REPORTER_R,
  ADJUSTER_R,
  REGISTRAR_R,
  LOSSADJUSTER_R,
  SUPERADJUSTER_R,
  TRUSTEDDOCTOR_R,
  RECEIPTIONICT_R,
} from 'utils/constants';
import { useBrowserstorageState } from 'modules/common/hooks';

const tabsOption = [
  {
    id: 0,
    label: t('ExExpenseTab'),
    roles: [
      ADMIN_R,
      EDITOR_R,
      COUNTER_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      RECEIPTIONICT_R,
      INSURED_R,
      COMPANY_R,
      REPORTER_R,
      INSURER_R,
      REGISTRAR_R,
    ],
  },
  {
    id: 1,
    label: t('ExDraftTab'),
    roles: [
      ADMIN_R,
      EDITOR_R,
      COUNTER_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      RECEIPTIONICT_R,
      INSURED_R,
    ],
  },
  {
    id: 2,
    label: t('ExFoldersTab'),
    roles: [
      ADMIN_R,
      EDITOR_R,
      COUNTER_R,
      ADJUSTER_R,
      SUPERADJUSTER_R,
      LOSSADJUSTER_R,
      TRUSTEDDOCTOR_R,
      RECEIPTIONICT_R,
    ],
  },
];

const checker = (value: number) => {
  if (typeof value === 'number' && value >= 0 && value < 3) return value;
  return 0;
};

const ExpensesPage = () => {
  const [value, setValue] = useBrowserstorageState('expense-tab', 0, 'sessionStorage', checker);
  const deferredValue = useDeferredValue(value);

  const isStale = value !== deferredValue;

  return (
    <Box pb={8}>
      <Container sx={{ maxWidth: 1350, px: { smLaptop: 0 } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={(_e, newValue) => setValue(newValue)}
            options={tabsOption}
          />
        </Box>

        <Suspense fallback='LOADING...'>
          {isStale ? (
            'LOADING...'
          ) : (
            <>
              <Tabs.Panel value={deferredValue} index={0}>
                <DocumentTitle title={t('ExExpenseTab') as string}>
                  <TrackExpenses />
                </DocumentTitle>
              </Tabs.Panel>

              <Tabs.Panel value={deferredValue} index={1}>
                <DocumentTitle title={t('ExDraftTab') as string}>
                  <ArchiveExpenses />
                </DocumentTitle>
              </Tabs.Panel>

              <Tabs.Panel value={deferredValue} index={2}>
                <DocumentTitle title={t('ExFoldersTab') as string}>
                  <ExpenseFolder />
                </DocumentTitle>
              </Tabs.Panel>
            </>
          )}
        </Suspense>
      </Container>
    </Box>
  );
};

export default ExpensesPage;
