import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { IconButton, Stack, Tooltip } from '@mui/material';

//components
import { MdEdit, MdDelete } from 'react-icons/md';
import { EditTransferModal } from '../EditTransferList';
import { DeleteTransferModal } from './DeleteTransferModal';
import { CustomModal, ReturnGenerateTools } from 'modules/common/components';

//utils
import { InfoMessage } from 'utils/constants';
import { useModal, useRole } from 'modules/common/hooks';

//types
import { TransferType } from 'services/models';

type ActionIconsTransferListProps = {
  params: ReturnGenerateTools<TransferType>;
};

export const ActionIconsTransferList = memo(({ params }: ActionIconsTransferListProps) => {
  const { is_archived } = params.row;

  const { t } = useTranslation();

  const { isAdmin } = useRole();
  const allowEdit = !is_archived || isAdmin;

  const { isOpen: deleteTransfer, onClose: onCloseDelete, onOpen: onOpenDelete } = useModal();
  const { isOpen: editTransfer, onClose: onCloseEdit, onOpen: onOpenEdit } = useModal();

  return (
    <>
      <Stack direction='row' spacing={0}>
        <Tooltip title={t('TrEdit')}>
          <IconButton sx={{ color: blueGrey[200] }} onClick={onOpenEdit}>
            <MdEdit />
          </IconButton>
        </Tooltip>

        <Tooltip title={allowEdit ? t('TrRemove') : ''}>
          <IconButton
            disabled={!allowEdit}
            sx={{ color: blueGrey[200], '&.Mui-disabled': { color: blueGrey[100] } }}
            onClick={onOpenDelete}
          >
            <MdDelete />
          </IconButton>
        </Tooltip>
      </Stack>

      <CustomModal
        header
        title={t('TrRemoveTransferList')}
        open={deleteTransfer}
        handleClose={onCloseDelete}
        sx={{ maxWidth: 500 }}
      >
        <DeleteTransferModal data={params.row} handleClose={onCloseDelete} />
      </CustomModal>

      <CustomModal
        header
        title={t('TrEditTransferList')}
        information={InfoMessage.addExpenseToTransferList}
        open={editTransfer}
        handleClose={onCloseEdit}
        sx={{ maxWidth: 1200 }}
      >
        <EditTransferModal data={params.row} />
      </CustomModal>
    </>
  );
});
