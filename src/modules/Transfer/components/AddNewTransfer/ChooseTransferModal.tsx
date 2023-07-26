import { Box } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { forwardRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

//components
import { TiTick } from 'react-icons/ti';
import { Button, ChooseExpense, CustomModal } from 'modules/common/components';

//utils
import { Constants } from 'utils/constants';
import { useModal } from 'modules/common/hooks';
import { TRANSFER_LIST, useEditTransferAPI } from 'modules/Transfer/hooks';

//types
import { EditTransferValue } from '../EditTransferList';

type ChooseTransferModalProps = {
  id: number;
};
type Ref = HTMLButtonElement;
type SubmitExpensesBtnProps = {
  id: number;
  handleClose: () => void;
};

// import { ChooseExpense } from "features/ChooseExpense";

export const ChooseTransferModal = forwardRef<Ref, ChooseTransferModalProps>(({ id }, ref) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Box>
        <Button
          ref={ref}
          type='button'
          variant='outlined'
          onClick={onOpen}
          endIcon={<TiTick />}
          sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
        >
          {t('TrAddExpense')}
        </Button>
      </Box>
      <CustomModal header title={t('TrChooseExpense')} open={isOpen} handleClose={onClose}>
        <ChooseExpense id={id} submitForm={<SubmitExpensesBtn handleClose={onClose} id={id} />} />
      </CustomModal>
    </>
  );
});

const SubmitExpensesBtn = ({ handleClose, id }: SubmitExpensesBtnProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const expensesToAdd = useWatch<EditTransferValue>({
    name: 'expensesToAdd',
  }) as EditTransferValue['expensesToAdd'];

  const onSuccess = useCallback(() => {
    handleClose();
    queryClient.invalidateQueries([TRANSFER_LIST]);
    toast.success(Constants.PublicFetchSuccess);
  }, [handleClose, queryClient]);

  const onError = useCallback(() => {
    toast.error(Constants.PublicFetchError);
  }, []);

  const { mutate: editTransfer, isLoading } = useEditTransferAPI({
    onSuccess,
    onError,
  });

  const onSubmit = useCallback(() => {
    //when id exists, means user wants edit expenses and
    //if it doesn't exist, means user wants create a new brand folder
    if (!!id) {
      if (!!!expensesToAdd.length) return;

      editTransfer({
        id,
        data: { added_expense_ids: expensesToAdd },
      });
    } else {
      handleClose();
    }
  }, [id, expensesToAdd, editTransfer, handleClose]);

  return (
    <Button.Loading
      sx={{ py: 1, mb: 1 }}
      loading={isLoading}
      disabled={isLoading}
      variant='contained'
      color='success'
      onClick={onSubmit}
      type='button'
    >
      {t('TrAddExpense')} ({expensesToAdd?.length ?? 0})
    </Button.Loading>
  );
};
