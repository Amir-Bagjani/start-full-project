//components
import { NewDataGridTable } from 'modules/common/components';
import { useContractAddendumAPI } from 'modules/common/hooks';

//types
import { columnsDataAddendum } from 'modules/ExpenseDetail/utils';

//types
import { SingleExpenseDetailType } from 'services/models';

type ContractAddendumProps = {
  contract: SingleExpenseDetailType['contract'];
};

const queryOption = { staleTime: 1 * 1000 * 60 * 60 }; // 1hour

export const ContractAddendum = ({ contract }: ContractAddendumProps) => {
  const { data: addendumData, isInitialLoading: isAddendumLoading } = useContractAddendumAPI(
    {
      contractId: contract.id,
    },
    queryOption,
  );

  console.log({ addendumData });

  return (
    <NewDataGridTable
      loading={isAddendumLoading}
      columns={columnsDataAddendum}
      rows={addendumData || []}
    />
  );
};
