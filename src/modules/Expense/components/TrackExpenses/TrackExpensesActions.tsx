import { Children, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

//components
import { CustomModal } from 'modules/common/components';
import { RejectExpenseModal } from './RejectExpenseModal';

//utils
import { useModal, useRole } from 'modules/common/hooks';
import { TRACK_EXPENSE_ACTION_DATA } from 'modules/Expense/utils';

//types
import { ExpenseType } from 'services/models';
// import { ALL_EXPENSES } from 'modules/Expense/hooks';

type TrackExpensesActionsProps = { data: ExpenseType; printIds: number[] };

export const TrackExpensesActions = memo(({ data, printIds }: TrackExpensesActionsProps) => {
  // const queryClient = useQueryClient();

  const { t } = useTranslation();

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
        title={t('ExAdjustment')}
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
        title={t('ExLog')}
        open={log}
        handleClose={onCloseLog}
        sx={{ maxWidth: 500 }}
      >
        {/* <NewLogExpenseModal handleClose={onCloseLog} id={data.id} /> */}
      </CustomModal>

      <CustomModal
        header
        title={t('ExChooseAgency')}
        open={agency}
        handleClose={onCloseAgency}
        sx={{ maxWidth: 1200 }}
      >
        {/* <ChooseAgencyLocation data={data} /> */}
      </CustomModal>

      <CustomModal
        header
        title={t('ExCancell')}
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
        title={t('ExReject')}
        open={reject}
        handleClose={onCloseReject}
        sx={{ maxWidth: 700 }}
      >
        <RejectExpenseModal expenseId={data.id} handleClose={onCloseReject} />
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
