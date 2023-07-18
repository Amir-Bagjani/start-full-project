import { useTranslation } from 'react-i18next';

//components
import { Button, CustomModal } from 'modules/common/components';
import { ChangeStatusModal } from './ChangeStatusModal';

//utils
import { useModal } from 'modules/common/hooks';

//types
type ChangeGroupStatusProps = {
  id: number[];
};

export const ChangeGroupStatus = ({ id }: ChangeGroupStatusProps) => {
  const { t } = useTranslation();

  const { isOpen: change, onClose: onCloseChange, onOpen: onOpenChange } = useModal();

  return (
    <>
      <Button variant='outlined' onClick={onOpenChange} disabled={id.length === 0}>
        {t('ExChangeGroupStatus')} ({id.length})
      </Button>

      <CustomModal
        header
        title={t('ExChangeStatus')}
        open={change}
        handleClose={onCloseChange}
        sx={{ maxWidth: 500 }}
      >
        <ChangeStatusModal handleClose={onCloseChange} id={id} status='' />
      </CustomModal>
    </>
  );
};
