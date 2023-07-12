import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { IconButton, Stack, Tooltip } from '@mui/material';

//components
import { MdEdit, MdDelete } from 'react-icons/md';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { DeleteFolderModal } from './DeleteFolderModal';
import { CustomModal, ReturnGenerateTools } from 'modules/common/components';
import { ExpenseFolderDetail } from '../ExpenseFolderDetail/ExpenseFolderDetail';
import { ExpensesToEvaluation } from '../ExpensesToEvaluation/ExpensesToEvaluation';

//utils
import { useModal, useRole } from 'modules/common/hooks';

//types
import { FolderExpenseType } from 'services/models';

type ActionIconsFolderProps = {
  params: ReturnGenerateTools<FolderExpenseType>;
};

export const ActionIconsFolder = memo(({ params }: ActionIconsFolderProps) => {
  const { t } = useTranslation();
  const { isAdmin } = useRole();

  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpen: onOpenDelete } = useModal();
  const { isOpen: isOpenEdit, onClose: onCloseEdit, onOpen: onOpenEdit } = useModal();
  const {
    isOpen: isOpenEvaluation,
    onClose: onCloseEvaluation,
    onOpen: onOpenEvaluation,
  } = useModal();

  return (
    <>
      <Stack direction='row' spacing={0}>
        {isAdmin && (
          <Tooltip title={t('ExEdit')}>
            <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenEdit}>
              <MdEdit />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={t('ExSeeExpenses')}>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenEvaluation}>
            <TbHeartRateMonitor />
          </IconButton>
        </Tooltip>

        {isAdmin ? (
          <Tooltip title={t('ExRemove')}>
            <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenDelete}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>

      <CustomModal
        header
        title={t('ExRemoveFolder')}
        open={isOpenDelete}
        handleClose={onCloseDelete}
        sx={{ maxWidth: 500 }}
      >
        <DeleteFolderModal data={params.row} handleClose={onCloseDelete} />
      </CustomModal>

      <CustomModal
        header
        title={t('ExEditFolder')}
        open={isOpenEdit}
        handleClose={onCloseEdit}
        sx={{ maxWidth: 1200 }}
      >
        <ExpenseFolderDetail data={params.row} />
      </CustomModal>

      <CustomModal
        header
        title={t('ExExpensesOfFolder')}
        open={isOpenEvaluation}
        handleClose={onCloseEvaluation}
        sx={{ maxWidth: 1200 }}
      >
        <ExpensesToEvaluation folderId={params.row.id} handleClose={onCloseEvaluation} />
      </CustomModal>
    </>
  );
});
