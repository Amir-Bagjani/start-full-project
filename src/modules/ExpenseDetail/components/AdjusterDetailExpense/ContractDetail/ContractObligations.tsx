//components
import { NewDataGridTable } from 'modules/common/components';

//utils
import { useContractObligationsAPI } from 'modules/common/hooks';
import { columnsDataContractObligations } from 'modules/ExpenseDetail/utils';

//types
import { SingleExpenseDetailType } from 'services/models';

type ContractObligationsProps = {
  contract: SingleExpenseDetailType['contract'];
};

const queryOption = { staleTime: 1 * 1000 * 60 * 60 }; // 1hour

export const ContractObligations = ({ contract }: ContractObligationsProps) => {
  const { data: obligationData, isInitialLoading: isObligationLoading } = useContractObligationsAPI(
    {
      contractId: contract.id,
    },
    queryOption,
  );

  return (
    <NewDataGridTable
      loading={isObligationLoading}
      rows={obligationData || []}
      columns={columnsDataContractObligations}
    />
  );
};
