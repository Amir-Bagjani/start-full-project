import { toast } from 'react-hot-toast';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext, useWatch } from 'react-hook-form';
import { Box, Stack, Tooltip, Typography, IconButton } from '@mui/material';

//components
import {
  Button,
  CustomModal,
  NewDataGridTable,
  CustomTableColumn,
  ReturnGenerateTools,
} from 'modules/common/components';
import { MdDelete } from 'react-icons/md';
import { SingleFolderForm } from '../ExpenseFolderDetail/ExpenseFolderDetail';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { columnsDataArchiveReport } from 'modules/common/utils';
import { EXPENSE_FOLDERS, useEditFolderAPI } from 'modules/Expense/hooks';

//types
import { ExpenseArchivedType, ExpenseType } from 'services/models';

type ShowSelectedExpenseProps = {
  archived: boolean;
  id: number;
};
type DeleteExpenseProps = {
  params: ReturnGenerateTools<ExpenseType>;
  id: number;
};

const pageSize = 30;
const onError = () => {
  toast.error(Constants.PublicFetchError);
};

export const ShowSelectedExpense = ({ archived, id }: ShowSelectedExpenseProps) => {
  const { t } = useTranslation();

  const expensesShowList = useWatch<SingleFolderForm>({
    name: 'expensesShowList',
  }) as SingleFolderForm['expensesShowList'];

  const actionColumn: CustomTableColumn<ExpenseArchivedType>[] = useMemo(
    () => [
      {
        hide: archived,
        disableColumnMenu: true,
        field: 'action',
        headerName: t('ExManagment'),
        width: 90,
        renderCell: (params) => <DeleteExpense params={params} id={id} />,
      },
    ],
    [archived, id, t],
  );

  return (
    <Box
      sx={{
        '& tr.MuiTableRow-root:hover': {
          //show main insurer if target was independant
          'td p.hover-show': {
            display: 'block',
          },
        },
      }}
    >
      <NewDataGridTable
        columns={columnsDataArchiveReport.concat(actionColumn)}
        rows={expensesShowList}
        loading={false}
        dataGridProps={{
          checkboxSelection: false,
          pageSize,
          pagination: true,
          hideFooter: false,
        }}
      />
    </Box>
  );
};

const DeleteExpense = ({ params, id }: DeleteExpenseProps) => {
  const expenseId = params.row.id;

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen } = useModal();

  const { setValue } = useFormContext<SingleFolderForm>();
  const [expenses, expensesShowList] = useWatch<SingleFolderForm>({
    name: ['expenses', 'expensesShowList'],
  }) as [SingleFolderForm['expenses'], SingleFolderForm['expensesShowList']];

  const onSuccess = useCallback(async () => {
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    toast.success(Constants.PublicFetchSuccess);
    onClose();
  }, [onClose, queryClient]);

  const { mutate: editFolder, isLoading } = useEditFolderAPI({ onError, onSuccess });

  const deleteExpense = () => {
    const newExpenses = expenses.filter((expense) => expense !== Number(expenseId));
    if (!!id) {
      //means we are in edit modal
      editFolder({
        id,
        data: { expenses: newExpenses },
      });
    } else {
      //means we are in add modal
      const newExpensesShowList = expensesShowList.filter((i) => i.id !== Number(expenseId));
      setValue('expenses', newExpenses);
      setValue('expensesShowList', newExpensesShowList);
    }
  };

  return (
    <>
      <div>
        <Tooltip title={expenses.length === 1 ? '' : t('ExRemoveExpense')}>
          <IconButton
            disabled={expenses.length === 1}
            sx={{ color: blueGrey[200], '&.Mui-disabled': { color: blueGrey[100] } }}
            onClick={onOpen}
          >
            <MdDelete />
          </IconButton>
        </Tooltip>
      </div>

      <CustomModal
        header
        title={t('ExRemoveExpense')}
        open={isOpen}
        handleClose={onClose}
        sx={{ maxWidth: 500 }}
      >
        <Stack spacing={5} py={1}>
          <Typography align='center' variant='h6'>
            {t('ExAreYouSureToRemove')}{' '}
            <Box component='span' color='red'>
              {' '}
              {t('ExExpense')}
            </Box>{' '}
            {t('ExSureDelete')}
          </Typography>

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button.Loading
              variant='outlined'
              sx={{ width: 100 }}
              color='error'
              onClick={deleteExpense}
              disabled={isLoading}
              loading={isLoading}
            >
              {t('ExRemove')}
            </Button.Loading>
            <Button variant='outlined' onClick={onClose} sx={{ width: 100 }}>
              {t('ExBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
