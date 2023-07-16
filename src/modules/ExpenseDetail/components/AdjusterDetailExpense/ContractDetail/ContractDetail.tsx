import { t } from 'i18next';
import { useState } from 'react';
import { Box } from '@mui/material';

//components
import { ContractInfo } from './ContractInfo';
import { Tabs } from 'modules/common/components';
import { ContractAddendum } from './ContractAddendum';
import { ContractObligations } from './ContractObligations';
import { ContractWaitingPeriod } from './ContractWaitingPeriod';

//types
import { SingleExpenseDetailType } from 'services/models';

type ContractDetailProps = {
  contract: SingleExpenseDetailType['contract'];
};

const tabsOption = [
  { id: 0, label: t('DeContractDetail') },
  { id: 1, label: t('DeContractObligation') },
  { id: 2, label: t('DeContractAdendum') },
  { id: 3, label: t('DeWaitingPeriod') },
];

export const ContractDetail = ({ contract }: ContractDetailProps) => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box>
        <Tabs value={value} onChange={(_e, newValue) => setValue(newValue)} options={tabsOption} />
      </Box>

      <Tabs.Panel value={value} index={0}>
        <ContractInfo contract={contract} />
      </Tabs.Panel>

      <Tabs.Panel value={value} index={1}>
        <ContractObligations contract={contract} />
      </Tabs.Panel>

      <Tabs.Panel value={value} index={2}>
        <ContractAddendum contract={contract} />
      </Tabs.Panel>

      <Tabs.Panel value={value} index={3}>
        <ContractWaitingPeriod contract={contract} />
      </Tabs.Panel>
    </>
  );
};
