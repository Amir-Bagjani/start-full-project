import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { blueGrey } from '@mui/material/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Tooltip, IconButton, Typography } from '@mui/material';
import { useForm, useFormContext, useWatch, SubmitHandler } from 'react-hook-form';

//components
import {
  Select,
  Button,
  TextBox,
  CustomModal,
  NewDataGridTable,
  EvaluationDetail,
  CustomTableColumn,
  ReturnGenerateTools,
} from 'modules/common/components';
import { FanavaranDetail } from './FanavarnDetail';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { MdDelete, MdMonitor } from 'react-icons/md';

//utils
import { Constants, InfoMessage } from 'utils/constants';
import FanavaranLogo from 'assets/images/fanavaranLogo_prev_ui.png';
import { TRANSFER_LIST, useEditTransferAPI } from 'modules/Transfer/hooks';
import { useAddActionExpenseAPI, useModal, useSampleDescriptionAPI } from 'modules/common/hooks';
import { columnDataExpenseForTransfer as columns } from 'modules/common/components/ChooseExpense/utils';

//types
import { ExpenseType, SingleExpenseDetailType } from 'services/models';
import { returnExpenseValidation } from 'modules/Transfer/utils';

type ShowSelectedExpensesForTransferProps = {
  id: number;
  is_archived: boolean;
  expensesShowList: SingleExpenseDetailType[];
  use_fanavaran_api: boolean;
};
type ActionsProps = {
  id: number;
  params: ReturnGenerateTools<ExpenseType>;
  expensesShowList: SingleExpenseDetailType[];
  use_fanavaran_api: boolean;
};
type DeleteModalProps = {
  handleClose: () => void;
  id?: number;
  expenseId?: number;
  expenseIds?: number[];
};
type ReturnModalProps = {
  handleClose: () => void;
  id?: number;
  expenseId?: number;
  expensesShowList: SingleExpenseDetailType[];
};
type AddActionValueType = {
  actionreason: string;
  actiontype: 2;
};

/**
 * I refactored here based on backend changes, so some structure should change here like "id"
 * which is used when this component was shared for "add" and "edit" expenses, but now it uses
 * only for "edit" :)
 */

export const ShowSelectedExpensesForTransfer = ({
  id,
  is_archived,
  expensesShowList,
  use_fanavaran_api,
}: ShowSelectedExpensesForTransferProps) => {
  const [deleteIds, setDeleteIds] = useState<number[]>([]);

  const { isOpen: openDelete, onClose: handleCloseDelete, onOpen: handleOpenDelete } = useModal();

  const actionColumn: CustomTableColumn<ExpenseType>[] = useMemo(
    () => [
      {
        hide: is_archived,
        sortable: false,
        disableColumnMenu: true,
        field: 'action',
        headerName: t('TrAction'),
        width: 150,
        renderCell: (params) => (
          <Actions
            id={id}
            params={params}
            expensesShowList={expensesShowList}
            use_fanavaran_api={use_fanavaran_api}
          />
        ),
      },
    ],
    [expensesShowList, id, is_archived, use_fanavaran_api],
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {!is_archived && (
        <Button
          variant='contained'
          color='success'
          onClick={!!deleteIds.length ? handleOpenDelete : undefined}
          sx={{ height: 40, position: 'absolute', top: -50, right: 0 }}
          disabled={!!!deleteIds.length}
        >
          {t('TrRemoveExpense')} ({deleteIds.length})
        </Button>
      )}
      <Box
        sx={{
          '& tr.MuiTableRow-root:hover': {
            'td p.hover-show': {
              display: 'block',
            },
          },
        }}
      >
        <NewDataGridTable
          columns={columns.concat(actionColumn)}
          rows={expensesShowList as any}
          loading={false}
          dataGridProps={{
            checkboxSelection: !is_archived,
            onSelectionModelChange: setDeleteIds as any,
            // selectionModel: deleteIds,
            pageSize: 80,
            // onPageSizeChange: setPageSize,
            pagination: true,
            hideFooter: false,
          }}
        />
      </Box>
      <CustomModal
        header
        title={t('TrRemoveExpense')}
        open={openDelete}
        handleClose={handleCloseDelete}
        sx={{ maxWidth: 500 }}
      >
        <DeleteModal handleClose={handleCloseDelete} expenseIds={deleteIds} id={id} />
      </CustomModal>
    </Box>
  );
};

const Actions = ({ params, id, expensesShowList, use_fanavaran_api }: ActionsProps) => {
  const queryClient = useQueryClient();

  const { isOpen: openDelete, onClose: handleCloseDelete, onOpen: handleOpenDelete } = useModal();
  const { isOpen: openReturn, onClose: handleCloseReturn, onOpen: handleOpenReturn } = useModal();
  const {
    isOpen: openFanavaran,
    onClose: handleCloseFanavaran,
    onOpen: handleOpenFanavaran,
  } = useModal();
  const {
    isOpen: openEvaluation,
    onClose: handleCloseEvaluation,
    onOpen: handleOpenEvaluation,
  } = useModal();

  const expenses = useWatch({
    name: 'expenses',
  });

  return (
    <>
      <Stack direction='row' spacing={-1}>
        <Tooltip title={expenses.length === 1 ? '' : t('TrRemoveExpense')}>
          <IconButton
            disabled={expenses.length === 1}
            sx={{
              color: blueGrey[200],
              '&.Mui-disabled': { color: blueGrey[100] },
            }}
            onClick={handleOpenDelete}
          >
            <MdDelete />
          </IconButton>
        </Tooltip>

        {!!id && ( // means we are in edit modal
          <Tooltip title={t('TrReturnExpense')}>
            <IconButton sx={{ color: blueGrey[200] }} onClick={handleOpenReturn}>
              <RiArrowGoBackFill />
            </IconButton>
          </Tooltip>
        )}

        {!!id && ( // means we are in edit modal
          <Tooltip title={t('TrDetailExpenses')}>
            <IconButton sx={{ color: blueGrey[200] }} onClick={handleOpenEvaluation}>
              <MdMonitor />
            </IconButton>
          </Tooltip>
        )}

        {use_fanavaran_api && (
          <Tooltip title={t('TrFanavaran')}>
            <IconButton onClick={handleOpenFanavaran}>
              <img src={FanavaranLogo} alt='fanavarn' width='22px' height='22px' />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <CustomModal
        header
        title={t('TrRemoveExpense')}
        open={openDelete}
        handleClose={handleCloseDelete}
        sx={{ maxWidth: 500 }}
      >
        <DeleteModal handleClose={handleCloseDelete} expenseId={params.row.id} id={id} />
      </CustomModal>

      <CustomModal
        header
        title={t('TrReturnExpense')}
        open={openReturn}
        handleClose={handleCloseReturn}
        sx={{ maxWidth: 500 }}
        information={InfoMessage.rejectExpense}
      >
        <ReturnModal
          handleClose={handleCloseReturn}
          expenseId={params.row.id}
          id={id}
          expensesShowList={expensesShowList}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('TrDetailExpenses')}
        open={openEvaluation}
        handleClose={handleCloseEvaluation}
        sx={{ maxWidth: 1200 }}
      >
        <EvaluationDetail
          data={params.row}
          updateExpenses={() => {
            queryClient.invalidateQueries([TRANSFER_LIST]);
          }}
        />
      </CustomModal>
      <CustomModal
        header
        title={t('TrFanavaranDetail')}
        open={openFanavaran}
        handleClose={handleCloseFanavaran}
        sx={{ maxWidth: 900 }}
      >
        <FanavaranDetail data={(params.row as any).expense_adjusts} />
      </CustomModal>
    </>
  );
};

const DeleteModal = ({ handleClose, id, expenseId, expenseIds }: DeleteModalProps) => {
  const queryClient = useQueryClient();

  const onError = useCallback(() => {
    toast.error(Constants.PublicFetchError);
  }, []);

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries([TRANSFER_LIST]);
    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, queryClient]);

  const { mutate: editTransfer, isLoading } = useEditTransferAPI();

  const deleteExpense = useCallback(() => {
    if (!!id) {
      //means we are in edit modal
      editTransfer(
        {
          id,
          data: { deleted_expense_ids: expenseId ? [expenseId] : expenseIds },
        },
        {
          onError,
          onSuccess,
        },
      );
    }
  }, [id, editTransfer, expenseId, expenseIds, onError, onSuccess]);

  return (
    <Stack spacing={5} py={1}>
      <Typography align='center'>
        {t('TrDoYouRemove')}{' '}
        <Box component='span' color='red'>
          {' '}
          {t('TrExpense')}
        </Box>{' '}
        {t('TrAreYouSure')}
      </Typography>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button
          variant='outlined'
          sx={{ width: 110 }}
          color='error'
          onClick={deleteExpense}
          disabled={isLoading}
        >
          {t('TrRemove')}
        </Button>
        <Button variant='outlined' sx={{ width: 110 }} onClick={handleClose}>
          {t('TrBack')}
        </Button>
      </Stack>
    </Stack>
  );
};

const ReturnModal = ({ handleClose, id, expenseId, expensesShowList }: ReturnModalProps) => {
  const queryClient = useQueryClient();
  const { setValue } = useFormContext();

  //handle onSuccess update for handle slow refetch server for transfer list
  const onSuccess = useCallback(() => {
    const newExpenses = expensesShowList.filter((i) => i.id !== expenseId);

    queryClient.setQueryData([TRANSFER_LIST], (oldQueryData: any) => {
      const updatedTransferList = [...oldQueryData].map((transfer) =>
        transfer.id === Number(id) ? { ...transfer, expenses: newExpenses } : transfer,
      );

      return updatedTransferList;
    });

    setValue(
      'expenses',
      [...newExpenses].map((i) => i.id),
    );

    toast.success(Constants.PublicFetchSuccess);
    handleClose();
  }, [handleClose, expensesShowList, queryClient, setValue, id, expenseId]);

  const onError = useCallback(() => {
    handleClose();
    toast.error(Constants.PublicFetchError);
  }, [handleClose]);

  const onSettled = useCallback(() => {
    queryClient.invalidateQueries([TRANSFER_LIST]);
  }, [queryClient]);

  const { mutate: returnExpense, isLoading: isReturningExpense } = useAddActionExpenseAPI();
  const { data: sampleDescriptions, isInitialLoading } = useSampleDescriptionAPI(
    {
      type: 1, //hardcoded value for return type
    },
    {
      staleTime: 1 * 1000 * 60 * 60,
    },
  );

  const { handleSubmit, control } = useForm<AddActionValueType>({
    resolver: yupResolver(returnExpenseValidation),
    defaultValues: {
      actionreason: '',
      actiontype: 2, //hardcoded value for return expense
    },
  });

  const onSubmit: SubmitHandler<AddActionValueType> = useCallback(
    (data) => {
      returnExpense(
        {
          expense: expenseId as number,
          ...data,
        },
        { onError, onSuccess, onSettled },
      );
    },
    [returnExpense, expenseId, onError, onSuccess, onSettled],
  );

  return (
    <Stack
      spacing={5}
      py={1}
      component='form'
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <Stack direction='column' spacing={3}>
        <Select.Form
          name='actionreason'
          control={control}
          label={t('TrDescription')}
          isLoading={isInitialLoading}
          defaultSelect={{ label: '', value: '' }}
          options={
            sampleDescriptions?.map((i) => ({
              label: i.description,
              value: i.description,
            })) || []
          }
        />
        <TextBox.Form
          name='actionreason'
          control={control}
          label={t('TrMoreDescription')}
          multiline
          rows={4}
        />
      </Stack>

      <Stack direction='row' spacing={3} justifyContent='center'>
        <Button.Loading
          variant='outlined'
          sx={{ width: 110 }}
          color='error'
          type='submit'
          loading={isReturningExpense}
          disabled={isReturningExpense}
        >
          {t('TrReturnExpense')}
        </Button.Loading>
        <Button sx={{ width: 110 }} variant='outlined' onClick={handleClose} type='button'>
          {t('TrBack')}
        </Button>
      </Stack>
    </Stack>
  );
};
