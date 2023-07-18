import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { IconButton, Stack, Tooltip } from '@mui/material';

//components
import { FiBarChart2 } from 'react-icons/fi';
import { MdChangeCircle } from 'react-icons/md';
import { ChangeStatusModal } from './ChangeStatusModal';
import { CustomModal, LogExpenseModal } from 'modules/common/components';

//utils
import { useModal } from 'modules/common/hooks';

//types
import { ExpenseType } from 'services/models';

type ChangeExpenseStatusActionsProps = {
  data: ExpenseType;
};

// import { ChangeStatusModal } from "./ChangeStatusModal";

export const ChangeExpenseStatusActions = ({ data }: ChangeExpenseStatusActionsProps) => {
  const { t } = useTranslation();

  const { isOpen: log, onClose: onCloseLog, onOpen: onOpenLog } = useModal();
  const { isOpen: change, onClose: onCloseChange, onOpen: onOpenChange } = useModal();

  return (
    <>
      <Stack direction='row' spacing={-1}>
        <Tooltip title={t('ExLog')}>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenLog}>
            <FiBarChart2 />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('ExChangeStatus')}>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenChange}>
            <MdChangeCircle />
          </IconButton>
        </Tooltip>
      </Stack>

      <CustomModal
        header
        title={t('ExLog')}
        open={log}
        handleClose={onCloseLog}
        sx={{ maxWidth: 500 }}
      >
        <LogExpenseModal handleClose={onCloseLog} id={data.id} />
      </CustomModal>

      <CustomModal
        header
        title={t('ExChangeStatus')}
        open={change}
        handleClose={onCloseChange}
        sx={{ maxWidth: 500 }}
      >
        <ChangeStatusModal
          handleClose={onCloseChange}
          id={data.id}
          status={data.expense_status?.code}
        />
      </CustomModal>
    </>
  );
};
