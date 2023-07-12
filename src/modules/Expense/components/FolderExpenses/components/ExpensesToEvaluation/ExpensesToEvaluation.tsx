import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

//components
import {
  Button,
  TextBox,
  CustomModal,
  NewDataGridTable,
  CustomTableColumn,
} from 'modules/common/components';
import { HiCheck } from 'react-icons/hi';
import { ExpensesToEvaluationAction } from './ExpensesToEvaluationAction';

// utils
import { Constants } from 'utils/constants';
import { SingleFolderExpenseResponse } from 'services/models';
import { useAddActionExpenseAPI, useModal } from 'modules/common/hooks';
import { EXPENSE_FOLDERS, useSingleExpenseFolderAPI } from 'modules/Expense/hooks';
import { checkAdjustment, columnDataExpenseToEvaluation as column } from 'modules/Expense/utils';

//types
type ExpensesToEvaluationProps = {
  folderId: number;
  handleClose: () => void;
  refresh?: boolean;
};
type SendModalProps = {
  folderId: number;
  handleClose: () => void;
};
type SendExpenseFormType = {
  folder: number;
  actiontype: 1;
  actionreason: string;
};

const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const onSendError = () => {
  toast.error(t('ExFloderDidnotSend'));
};
const pageSize = 30;

export const ExpensesToEvaluation = ({
  folderId,
  handleClose,
  refresh,
}: ExpensesToEvaluationProps) => {
  const { data: expense, isInitialLoading: isLoadingExpense } = useSingleExpenseFolderAPI(
    {
      id: folderId,
    },
    {
      onError,
    },
  );

  const actionColumn: CustomTableColumn<SingleFolderExpenseResponse['expenses']>[] = useMemo(
    () => [
      {
        field: 'action',
        headerName: t('ExManagment'),
        width: 90,
        renderCell: (params) => (
          <ExpensesToEvaluationAction
            selectedExpense={params.row.id}
            folderId={folderId}
            refresh={refresh}
          />
        ),
      },
    ],
    [folderId, refresh],
  );

  const isAllAdjustment = checkAdjustment(expense);

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction='row' alignItems='center'>
        <Typography>
          {t('ExAllExpensesAdjusted')} {isAllAdjustment ? t('ExhaveBecame') : t('ExHasNotBeen')}
        </Typography>

        {isAllAdjustment && <SendModal folderId={folderId} handleClose={handleClose} />}
      </Stack>
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
          columns={column.concat(actionColumn)}
          rows={(expense as any)?.expenses ?? []}
          loading={isLoadingExpense}
          dataGridProps={{
            checkboxSelection: false,
            pageSize,
            // onPageSizeChange,
            pagination: true,
            hideFooter: false,
          }}
        />
      </Box>
    </Stack>
  );
};

const SendModal = ({ folderId, handleClose }: SendModalProps) => {
  const queryClient = useQueryClient();

  const { isOpen: isOpenSendModal, onClose: closeSendModal, onOpen: openSendModal } = useModal();

  const { control, handleSubmit } = useForm<SendExpenseFormType>({
    defaultValues: {
      folder: folderId,
      actiontype: 1 /*hardcoded value for send expense*/,
      actionreason: '',
    },
  });

  const onSuccess = useCallback(async () => {
    toast.success(Constants.PublicFetchSuccess);
    await queryClient.invalidateQueries([EXPENSE_FOLDERS]);
    closeSendModal();
    handleClose();
  }, [closeSendModal, handleClose, queryClient]);

  const { mutate: sendFolder, isLoading: isSendingFolder } = useAddActionExpenseAPI({
    onError: onSendError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<SendExpenseFormType> = (data) => {
    sendFolder(data);
  };

  return (
    <>
      <Button
        onClick={openSendModal}
        sx={{ height: 40 }}
        variant='outlined'
        color='success'
        endIcon={<HiCheck />}
      >
        {t('ExSend')}
      </Button>

      <CustomModal
        header
        title={t('ExSendFolder')}
        open={isOpenSendModal}
        handleClose={closeSendModal}
        sx={{ maxWidth: 600 }}
      >
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
          <Typography align='center' variant='h6'>
            {t('ExAreYouSureToSendFolder')}
          </Typography>

          <TextBox.Form
            name='actionreason'
            control={control}
            label={t('ExComments')}
            multiline
            rows={8}
            fullWidth
          />

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button.Loading
              variant='outlined'
              sx={{ width: 100 }}
              color='success'
              type='submit'
              loading={isSendingFolder}
              disabled={isSendingFolder}
            >
              {t('ExSend')}
            </Button.Loading>
            <Button variant='outlined' onClick={closeSendModal} sx={{ width: 100 }}>
              {t('ExBack')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
