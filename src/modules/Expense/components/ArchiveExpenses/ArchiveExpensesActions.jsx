import { memo } from 'react';
import { Link } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components & utils
import { MdEdit } from 'react-icons/md';
import { BsPrinter } from 'react-icons/bs';
import { FiBarChart2 } from 'react-icons/fi';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { useModal, useRole } from 'modules/common/hooks';
import { ADMIN_R, COUNTER_R, REGISTRAR_R } from 'utils/constants';
import { CustomModal } from 'modules/common/components';
// import { NewLogExpenseModal } from 'features/NewLogExpenseModal';

export const ArchiveExpensesActions = memo(({ data }) => {
  const { isOpen: log, onClose: onCloseLog, onOpen: onOpenLog } = useModal();

  const { includedRole } = useRole();

  return (
    <>
      <Stack direction='row' spacing={-1}>
        <Tooltip title='جزئیات هزینه'>
          <Box component={Link} to={`/expense/${data.id}`}>
            <IconButton
              sx={{
                color: blueGrey[200],
                '&.Mui-disabled': { color: blueGrey[100] },
              }}
            >
              <TbHeartRateMonitor />
            </IconButton>
          </Box>
        </Tooltip>

        <Tooltip title='لاگ هزینه'>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenLog}>
            <FiBarChart2 />
          </IconButton>
        </Tooltip>

        {/* only admin, counter and registrar can do print */}
        {includedRole([ADMIN_R, COUNTER_R, REGISTRAR_R]) ? (
          <Tooltip title='پرینت'>
            <Box component={Link} to={`/expense/print/${data.id}`} target='_blank'>
              <IconButton sx={{ color: blueGrey[200] }}>
                <BsPrinter />
              </IconButton>
            </Box>
          </Tooltip>
        ) : null}

        <Tooltip title='ویرایش'>
          <Box component={Link} to={`/expense/${data.id}`}>
            <IconButton
              sx={{
                color: blueGrey[200],
                '&.Mui-disabled': { color: blueGrey[100] },
              }}
            >
              <MdEdit />
            </IconButton>
          </Box>
        </Tooltip>
      </Stack>

      <CustomModal
        header
        title='لاگ هزینه'
        open={log}
        handleClose={onCloseLog}
        sx={{ maxWidth: 500 }}
      >
        {/* <NewLogExpenseModal handleClose={onCloseLog} id={data.id} /> */}
      </CustomModal>
    </>
  );
});
