import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { IconButton, Tooltip } from '@mui/material';

//components
import { MdMonitor } from 'react-icons/md';

//utils
import { useRole } from 'modules/common/hooks';
import { ROUTES_NAME } from 'routes/routesName';
import { ADJUSTER_R, RECEIPTIONICT_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R } from 'utils/constants';

//types
type ExpensesToEvaluationActionProps = {
  selectedExpense: number;
  folderId: number;
  refresh?: boolean;
};

export const ExpensesToEvaluationAction = ({
  selectedExpense,
  folderId,
  refresh,
}: ExpensesToEvaluationActionProps) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { includedRole } = useRole();

  return (
    <>
      <Tooltip title={t('ExAdjustment')}>
        <IconButton
          sx={{ color: blueGrey[200] }}
          onClick={() => {
            if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R, RECEIPTIONICT_R]))
              navigate(ROUTES_NAME.expense.detail, {
                state: {
                  expenseId: selectedExpense,
                  folderId,
                },
                // replace: true,
              });
            // navigate(`/expense/${selectedExpense}`, {
            //   state: folderId,
            //   // replace: true,
            // });
            else if (refresh) window.location.reload();
          }}
        >
          <MdMonitor />
        </IconButton>
      </Tooltip>
    </>
  );
};
