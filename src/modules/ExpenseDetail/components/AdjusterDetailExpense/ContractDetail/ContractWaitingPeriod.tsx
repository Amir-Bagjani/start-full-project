//components
import { NewDataGridTable } from 'modules/common/components';
import { columnsDataWaitingPeriod } from 'modules/ExpenseDetail/utils';

//utils
import { useContractWaitingListAPI } from 'modules/common/hooks';

//types
import { SingleExpenseDetailType } from 'services/models';

type ContractWaitingPeriodProps = {
  contract: SingleExpenseDetailType['contract'];
};

const queryOption = { staleTime: 1 * 1000 * 60 * 60 }; // 1hour

export const ContractWaitingPeriod = ({ contract }: ContractWaitingPeriodProps) => {
  const { data: waitingListData, isInitialLoading: isWaitingListLoading } =
    useContractWaitingListAPI(
      {
        contractId: contract.id,
      },
      queryOption,
    );

  return (
    <NewDataGridTable
      loading={isWaitingListLoading}
      columns={columnsDataWaitingPeriod}
      rows={waitingListData || []}
    />
  );
};
