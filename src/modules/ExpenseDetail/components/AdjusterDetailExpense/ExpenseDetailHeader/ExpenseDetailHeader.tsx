import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';

//components
import { CustomModal } from 'modules/common/components';
import { ExpensesToEvaluation } from 'modules/Expense/components/FolderExpenses/components/ExpensesToEvaluation/ExpensesToEvaluation';

//utils
import { useModal } from 'modules/common/hooks';
import { extractDataFromExpense } from '../../../utils';

//types
import { SingleExpenseDetailType } from 'services/models';

type ExpenseDetailHeaderProps = {
  folderId?: number | undefined;
  singleExpense?: SingleExpenseDetailType;
};

const style = {
  bgcolor: 'background.paper',
  minHeight: 48,
  py: 0.5,
  px: 1.5,
  borderRadius: 1,
  border: 1,
  borderColor: 'grey.300',
} as const;

export const ExpenseDetailHeader = ({ singleExpense, folderId }: ExpenseDetailHeaderProps) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  const { name, nationalCode } = extractDataFromExpense(singleExpense);

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={style}>
        <Stack direction='row' alignItems='center' spacing={3}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>{t('DeName')}: </Typography>
            <Typography>{name}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>{t('DeNationalNumber')}: </Typography>
            <Typography>{nationalCode}</Typography>
          </Stack>
        </Stack>

        {!!folderId && (
          <Stack sx={{ marginInlineStart: 'auto' }}>
            <Button onClick={onOpen} variant='outlined'>
              {t('DeOtherExpensesInFolder')}
            </Button>
          </Stack>
        )}
      </Stack>

      {!!folderId && (
        <CustomModal
          header
          title={t('DeExpensesInFolder')}
          open={isOpen}
          handleClose={onClose}
          sx={{ maxWidth: 1200 }}
        >
          <ExpensesToEvaluation folderId={folderId} handleClose={onClose} />
        </CustomModal>
      )}
    </>
  );
};
