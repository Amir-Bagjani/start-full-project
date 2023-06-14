import { Children, memo } from 'react';
import { blueGrey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components & utils
// import { useModal, useRole } from 'hooks';
// import { ALL_EXPENSES } from '../../hooks';
// import { CustomModal } from 'components/shared';
// import { TRACK_EXPENSE_ACTION_DATA } from '../../utils';
// import { EvaluationDetail } from 'features/EvaluationDetail';
// import { ChooseAgencyLocation } from './ChooseAgencyLocation';
// import { NewLogExpenseModal } from 'features/NewLogExpenseModal';
// import { CancellationExpenseModal } from './CancellationExpenseModal';
// import { AddCommentModal } from "./AddCommentModal";
// import { RejectExpenseModal } from './RejectExpenseModal';
// import { ConfirmExpenseModal } from "./ConfirmExpenseModal";

//utils

//components

//types
import { ExpenseType } from 'services/models';
import { useModal, useRole } from 'modules/common/hooks';
import { TRACK_EXPENSE_ACTION_DATA } from 'modules/Expense/utils';
import { CustomModal } from 'modules/common/components';
import { ALL_EXPENSES } from 'modules/Expense/hooks';

type TrackExpensesActionsProps = { data: ExpenseType; printIds: number[] };

export const TrackExpensesActions = memo(({ data, printIds }: TrackExpensesActionsProps) => {
  const queryClient = useQueryClient();

  const { includedRole } = useRole();

  const { isOpen: log, onClose: onCloseLog, onOpen: onOpenLog } = useModal();
  const { isOpen: agency, onClose: onCloseAgency, onOpen: onOpenAgency } = useModal();
  const {
    isOpen: cancellation,
    onClose: onCloseCancellation,
    onOpen: onOpenCancellation,
  } = useModal();
  const {
    isOpen: expenseAdjust,
    onClose: onCloseExpenseAdjust,
    onOpen: onOpenExpenseAdjust,
  } = useModal();
  const { isOpen: reject, onClose: onCloseReject, onOpen: onOpenReject } = useModal();
  // const { isOpen: confirm, onClose: onCloseConfirm, onOpen: onOpenConfirm } = useModal();
  // const { isOpen: comment, onClose: onCloseComment, onOpen: onOpenComment } = useModal();

  const ClickMap: Record<string, any> = {
    log: onOpenLog,
    agency: onOpenAgency,
    cancellation: onOpenCancellation,
    expenseAdjust: onOpenExpenseAdjust,
    reject: onOpenReject,
    // confirm: onOpenConfirm,
    // comment: onOpenComment,
  };

  return (
    <>
      <Stack direction='row' spacing={-1}>
        {Children.toArray(
          TRACK_EXPENSE_ACTION_DATA.map((action) =>
            includedRole(action.roles) ? (
              //  && (action?.extraCondition?.(data) ?? true)
              <Tooltip title={action.title}>
                <Box component={action.component} {...action.componentProps(data.id, printIds)}>
                  <IconButton
                    sx={{ color: blueGrey[200] }}
                    onClick={action?.key ? ClickMap[action.key] : undefined}
                  >
                    {action.icon}
                  </IconButton>
                </Box>
              </Tooltip>
            ) : null,
          ),
        )}
      </Stack>

      <CustomModal
        header
        title='کارشناسی'
        open={expenseAdjust}
        handleClose={onCloseExpenseAdjust}
        sx={{ maxWidth: 1200 }}
      >
        {/* <EvaluationDetail
          data={data}
          updateExpenses={() => {
            queryClient.invalidateQueries([ALL_EXPENSES]);
          }}
        /> */}
      </CustomModal>

      <CustomModal
        header
        title='لاگ هزینه'
        open={log}
        handleClose={onCloseLog}
        sx={{ maxWidth: 500 }}
      >
        {/* <NewLogExpenseModal handleClose={onCloseLog} id={data.id} /> */}
      </CustomModal>

      <CustomModal
        header
        title='انتخاب مرکز اسناد'
        open={agency}
        handleClose={onCloseAgency}
        sx={{ maxWidth: 1200 }}
      >
        {/* <ChooseAgencyLocation data={data} /> */}
      </CustomModal>

      <CustomModal
        header
        title='ابطال سند'
        open={cancellation}
        handleClose={onCloseCancellation}
        sx={{ maxWidth: 700 }}
      >
        {/* <CancellationExpenseModal data={data} handleClose={onCloseCancellation} /> */}
      </CustomModal>

      {/* <CustomModal
        header
        title="توضیحات"
        open={comment}
        handleClose={onCloseComment}
        sx={{ maxWidth: 700 }}
      >
        <AddCommentModal
          data={data}
          handleClose={onCloseComment}
        />
      </CustomModal> */}

      <CustomModal
        header
        title='عودت'
        open={reject}
        handleClose={onCloseReject}
        sx={{ maxWidth: 700 }}
      >
        {/* <RejectExpenseModal expenseId={data.id} handleClose={onCloseReject} /> */}
      </CustomModal>

      {/* <CustomModal
        header
        title="تایید"
        open={confirm}
        handleClose={onCloseConfirm}
        sx={{ maxWidth: 700 }}
      >
        <ConfirmExpenseModal
          expenseId={data.id}
          handleClose={onCloseConfirm}
        />
      </CustomModal> */}
    </>
  );
});
