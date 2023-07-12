import { Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

//components
// import { AddFolderForm } from './AddFolderForm';

//utils
import { addFolderValidation } from 'modules/Expense/utils';
import { AddFolderForm } from './AddFolderForm';

// import { ShowSelectedExpense } from './ShowSelectedExpense';
// import { ChooseExpensesModal } from './ChooseExpensesModal';

//types
type AddNewFolderProps = {
  handleClose: () => void;
};
export type AddFolderValuesForm = {
  name: string;
  date: string;
  expenses: number[];
  contract: string | number;
  expensesShowList: any[];
};

const defaultValues = {
  name: '',
  date: new Date().toISOString(),
  expenses: [],
  contract: '',
  expensesShowList: [],
};

export const AddNewFolder = ({ handleClose }: AddNewFolderProps) => {
  const methods = useForm<AddFolderValuesForm>({
    resolver: yupResolver(addFolderValidation),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <AddFolderForm handleClose={handleClose} />
          {/* <Stack spacing={2}>
            <ChooseExpensesModal />
            <ShowSelectedExpense />
          </Stack> */}
        </Stack>
      </Stack>
    </FormProvider>
  );
};
