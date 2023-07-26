import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

//components

//utils
import { addTransferValidation } from 'modules/Transfer/utils';

//types
import { TransferType } from 'services/models';
import { AddTransferForm } from './AddTransferForm';

type AddNewTransferProps = {
  handleClose: () => void;
};
export type AddNewTransferValue = {
  title: string;
  date: string;
  expenses: number[];
  contract: string | number;
  province: string | number;
  insurance_policy: string | number;
  expensesShowList: TransferType[]; //detail of transfer may change
};

// import { addTransferValidation } from '../../utils';
// import { AddTransferForm } from './AddTransferForm';

const defaultValues: AddNewTransferValue = {
  title: '',
  date: new Date().toISOString(),
  expenses: [],
  contract: '',
  province: '',
  insurance_policy: '',

  expensesShowList: [],
};

export const AddNewTransfer = ({ handleClose }: AddNewTransferProps) => {
  const methods = useForm<AddNewTransferValue>({
    resolver: yupResolver(addTransferValidation),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <AddTransferForm handleClose={handleClose} />
    </FormProvider>
  );
};
