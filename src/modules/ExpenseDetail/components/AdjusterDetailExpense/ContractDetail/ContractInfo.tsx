import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';

//utils
import { DateFormat } from 'utils/helper';

//types
import { SingleExpenseDetailType } from 'services/models';

type ContractInfoProps = {
  contract: SingleExpenseDetailType['contract'];
};

export const ContractInfo = ({ contract }: ContractInfoProps) => {
  const {
    title,
    in_contract_register_deadline,
    after_contract_register_deadline,
    start_date,
    end_date,
  } = contract;

  const { t } = useTranslation();

  return (
    <Stack sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1 }} spacing={3}>
      <Typography>
        {t('DeContractTitle')} : {title ?? '-'}
      </Typography>

      <Stack direction='row' alignItems='center'>
        <Typography sx={{ flex: 1 }}>
          {t('DeInContractRegisterDeadline')} : {in_contract_register_deadline ?? '-'}
        </Typography>
        <Typography sx={{ flex: 1 }}>
          {t('DeAfterContractRegisterDeadline')} : {after_contract_register_deadline ?? '-'}
        </Typography>
      </Stack>

      <Stack direction='row' alignItems='center'>
        <Typography sx={{ flex: 1 }}>
          {t('DeStartDate')}: {DateFormat.fPersianDate(start_date) ?? '-'}
        </Typography>
        <Typography sx={{ flex: 1 }}>
          {t('DeEndDate')} : {DateFormat.fPersianDate(end_date) ?? '-'}
        </Typography>
      </Stack>
    </Stack>
  );
};
