import { Collapse, Stack } from '@mui/material';

//components
import { FormDetail } from './FormDetail';
import { useTranslation } from 'react-i18next';
import { Button } from 'modules/common/components';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';

//utils
import { useModal } from 'modules/common/hooks';

//types
import { SingleExpenseDetailType } from 'services/models';

type ExpenseDetailFormProps = {
  singleExpense: SingleExpenseDetailType;
};

export const ExpenseDetailForm = ({ singleExpense }: ExpenseDetailFormProps) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useModal(true);

  return (
    <Stack
      spacing={2}
      sx={{
        border: 1,
        borderColor: 'grey.300',
        p: 1.5,
        borderRadius: 1,
        bgcolor: 'background.paper',
        ...(!isOpen && { pb: 0 }),
      }}
    >
      <Stack spacing={1.5} direction='row' alignItems='center' sx={{ height: 48 }}>
        <Button
          variant='outlined'
          onClick={onToggle}
          startIcon={isOpen ? <BsArrowsCollapse /> : <BsArrowsExpand />}
          sx={{ minWidth: 'max-content' }}
        >
          {t('DeExpenseDetail')}
        </Button>
        <Stack
          component='span'
          justifyContent='center'
          sx={{ width: 1, height: '100%', py: 0.5, px: 1.5 }}
        >
          {t('DeTrackingCode')} : {singleExpense?.tracking_code ?? '-'}
        </Stack>
      </Stack>

      <Collapse in={isOpen}>
        <FormDetail singleExpense={singleExpense} />
      </Collapse>
    </Stack>
  );
};
