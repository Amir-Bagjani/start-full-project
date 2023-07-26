import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Stack } from '@mui/material';

//components
import {
  CustomModal,
  DocumentTitle,
  NewDataGridTable,
  ReturnGenerateTools,
} from 'modules/common/components';
import { AddNewTransferModal } from '../components/AddNewTransfer';
import { EditTransferModal } from '../components/EditTransferList';

//utils
import { useTransferListAPI } from '../hooks';
import { useModal } from 'modules/common/hooks';
import { Constants, InfoMessage } from 'utils/constants';
import { columnDataTransferList as columns } from '../utils';

//types
import { TransferType } from 'services/models';

const onError = () => {
  toast.error(Constants.PublicFetchError);
};
const PageSize = 30;

const TransferPage = () => {
  const { t } = useTranslation();

  const [clickedData, setClickedData] = useState<TransferType | null>(null);

  const [page, setPage] = useState(1);

  const { isOpen, onClose, onOpen } = useModal();

  const handleCloseModal = useCallback(() => {
    onClose();
    setClickedData(null);
  }, [onClose]);

  const handleOpenModal = useCallback(
    (params: ReturnGenerateTools<TransferType>) => {
      setClickedData(params.row);
      onOpen();
    },
    [onOpen],
  );

  const { data: transferList, isInitialLoading: isLoadingTransferList } = useTransferListAPI(
    {
      page,
    },
    {
      onError,
    },
  );

  return (
    <DocumentTitle title={t('TrTransferList') as string}>
      <Container sx={{ pt: 2 }}>
        <Stack spacing={1}>
          <AddNewTransferModal />

          <NewDataGridTable
            loading={isLoadingTransferList}
            columns={columns}
            rows={transferList?.results || []}
            dataGridProps={{
              checkboxSelection: false,
              onRowDoubleClick: handleOpenModal,
            }}
            paginatable={!isLoadingTransferList && (transferList?.count ?? 0) > PageSize}
            paginationProps={{
              currentPage: page,
              lastPage: Math.ceil((transferList?.count ?? 0) / PageSize),
              maxLength: 7,
              onChange: setPage,
            }}
          />
        </Stack>
      </Container>

      {/* show edit modal when user does double click */}
      {isOpen && (
        <CustomModal
          header
          title={t('TrEditTransferToFinance')}
          information={InfoMessage.addExpenseToTransferList}
          open={isOpen}
          handleClose={handleCloseModal}
          sx={{ maxWidth: 1200 }}
        >
          <EditTransferModal data={clickedData} />
        </CustomModal>
      )}
    </DocumentTitle>
  );
};

export default TransferPage;
