import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

//components
import { BsCollectionFill } from 'react-icons/bs';

//utils
import { useModal } from 'modules/common/hooks';
import { aggregationValidation } from 'modules/Transfer/utils';
import { Button, CustomModal } from 'modules/common/components';
import { FilterAggregationForm } from './FilterAggregationForm';
import { ChooseAggregationTransfer } from './ChooseAggregationTransfer';

//types
type AggregationModalProps = {
  id: number;
};
type Ref = HTMLButtonElement;

// import { aggregationValidation } from '../../utils';
// import { FilterAggregationForm } from './FilterAggregationForm';
// import { ChooseAggregationTransfer } from './ChooseAggregationTransfer';

const defaultValues = {
  fdate: null,
  tdate: null,
  user: '',
  name: '',
};

export const AggregationModal = forwardRef<Ref, AggregationModalProps>(({ id }, ref) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();
  const {
    isOpen: aggregation,
    onClose: onCloseAggregation,
    onOpen: onOpenAggregation,
  } = useModal();

  const methods = useForm({
    resolver: yupResolver(aggregationValidation),
    defaultValues,
  });

  return (
    <>
      <Box>
        <Button
          ref={ref}
          type='button'
          variant='outlined'
          onClick={onOpen}
          endIcon={<BsCollectionFill />}
          sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
        >
          تجمیع هزینه ها
        </Button>
      </Box>
      <FormProvider {...methods}>
        <CustomModal
          header
          title={t('TrSelectUser')}
          open={isOpen}
          handleClose={onClose}
          sx={{ maxWidth: 500 }}
        >
          <FilterAggregationForm closeModal={onClose} onOpenAggregation={onOpenAggregation} />
        </CustomModal>
        <CustomModal
          header
          title={t('TrAggregationExpenses')}
          open={aggregation}
          handleClose={onCloseAggregation}
          sx={{ maxWidth: 1200 }}
        >
          <ChooseAggregationTransfer id={id} handleClose={onCloseAggregation} />
        </CustomModal>
      </FormProvider>
    </>
  );
});
