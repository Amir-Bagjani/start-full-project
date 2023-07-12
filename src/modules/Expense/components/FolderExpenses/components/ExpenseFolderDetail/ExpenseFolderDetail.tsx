import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';

//components
import { EditSelectedExpensesForm } from './EditSelectedExpensesForm';
import { ChooseExpensesModal, ShowSelectedExpense } from '../AddNewFolder';

//utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { useRole } from 'modules/common/hooks';
import { useSingleExpenseFolderAPI } from 'modules/Expense/hooks';
import { TypeMap, editeSingleFolderExpensesValidation } from 'modules/Expense/utils';

//types
import { ExpenseType, FolderExpenseType, SingleFolderExpenseResponse } from 'services/models';

type ExpenseFolderDetailProps = {
  data: FolderExpenseType;
};
export type SingleFolderForm = {
  name: string;
  is_archived: boolean;
  expenses: number[];
  expensesShowList: ExpenseType[];
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: { zero: 'column', tablet: 'row' },
    justifyContent: 'center',
    gap: { zero: 2, tablet: 10 },
    alignItems: 'center',
  },
  baxWrapper: { border: 1, borderRadius: 1, borderColor: 'grey.300', width: 'max-content' },
  header: { bgcolor: 'grey.A200', borderBottom: 1, borderColor: 'grey.300', fontSize: 14, p: 1 },
  loading: { minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' },
} as const;

const defaultValues = {
  expenses: [],
  name: '',
  is_archived: false,
  expensesShowList: [],
};
const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const ExpenseFolderDetail = ({ data }: ExpenseFolderDetailProps) => {
  const { id } = data;

  const { t } = useTranslation();
  const { isAdmin } = useRole();

  const methods = useForm<SingleFolderForm>({
    resolver: yupResolver(editeSingleFolderExpensesValidation),
    defaultValues,
  });
  const { reset } = methods;

  const onSuccess = useCallback(
    (data: SingleFolderExpenseResponse) => {
      reset({
        expenses: data.expenses?.map((i: any) => i.id) ?? [],
        name: data.name,
        is_archived: data.is_archived,
        expensesShowList: data.expenses as any,
      });
    },
    [reset],
  );

  const { data: singleExpense, isFetching: isLoadingSingleExpense } = useSingleExpenseFolderAPI(
    {
      id,
    },
    {
      onSuccess,
      onError,
    },
  );

  const allowedEdit = (!singleExpense?.is_archived ?? false) || isAdmin;

  return (
    <FormProvider {...methods}>
      <Stack spacing={4}>
        {isLoadingSingleExpense && (
          <Box sx={styles.loading}>
            <CircularProgress color='primary' />
          </Box>
        )}
        {!isLoadingSingleExpense && (
          <>
            <Box sx={styles.container}>
              <Box sx={styles.baxWrapper}>
                <Box sx={styles.header}>
                  <Typography align='center' fontWeight='bold'>
                    {t('ExFolderDetail')}
                    <Box component='span' sx={{ color: (theme) => theme.palette.primary.main }}>
                      {' '}
                      {singleExpense?.name}
                    </Box>
                  </Typography>
                </Box>
                <Stack p={2} direction={{ zero: 'column', tablet: 'row' }} spacing={3}>
                  <Stack direction='row' spacing={3}>
                    <Typography>
                      {' '}
                      {t('ExName')} : {singleExpense?.name}
                    </Typography>
                    <Typography>
                      {' '}
                      {t('ExIsArchived')} : {singleExpense?.is_archived ? t('ExYes') : t('ExNo')}
                    </Typography>
                  </Stack>
                  <Stack direction='row' spacing={3}>
                    <Typography>
                      {t('ExFolderTyope')} :
                      {singleExpense?.type ? TypeMap[singleExpense?.type] : ' - '}
                    </Typography>
                    <Typography>
                      {' '}
                      {t('ExDateOfRegisterExpense')} :{' '}
                      {DateFormat.fPersianDate(singleExpense?.created_at)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <>{allowedEdit && <EditSelectedExpensesForm data={data} />}</>
            </Box>

            <Stack spacing={2}>
              {allowedEdit && <ChooseExpensesModal id={id} />}
              <ShowSelectedExpense archived={!allowedEdit} id={id} />
            </Stack>
          </>
        )}
      </Stack>
    </FormProvider>
  );
};
