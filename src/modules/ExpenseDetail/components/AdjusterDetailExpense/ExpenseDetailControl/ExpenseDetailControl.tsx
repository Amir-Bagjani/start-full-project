import { t } from 'i18next';
import { Children, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Stack, Typography } from '@mui/material';

//components
import { ImHistory } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';
import { SiSimilarweb } from 'react-icons/si';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { InsuredHistory } from '../InsuredHistory';
import { ContractDetail } from '../ContractDetail';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { MdGavel, MdPerson3 } from 'react-icons/md';
import { RejectExpenseModal } from './RejectExpenseModal';
import { ConfirmExpenseModal } from './ConfirmExpenseModal';
import { Button, CustomModal } from 'modules/common/components';
import { SendToMasterAdjuster, SendToTrustedDoctor } from '../../common';

//utils
import { useModal, useRole } from 'modules/common/hooks';
import { ADJUSTER_R, RECEIPTIONICT_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R } from 'utils/constants';

//types
import { SingleExpenseDetailType } from 'services/models';

type ExpenseDetailControlProps = {
  singleExpense: SingleExpenseDetailType;
  folderId?: number;
};

const roles = [ADJUSTER_R, SUPERADJUSTER_R, TRUSTEDDOCTOR_R, RECEIPTIONICT_R];

const CONTROL_DATA = [
  {
    id: 1,
    title: t('DeSendToTrustedDoctor'),
    icon: <FaBriefcaseMedical />,
    key: 'doctor',
    roles: [ADJUSTER_R, SUPERADJUSTER_R, RECEIPTIONICT_R],
  },
  {
    id: 2,
    title: t('DeSendToSueprAdjuster'),
    icon: <MdPerson3 />,
    key: 'master',
    roles: [ADJUSTER_R, TRUSTEDDOCTOR_R, RECEIPTIONICT_R],
  },
  {
    id: 3,
    title: t('DeInsuredHistory'),
    icon: <ImHistory />,
    key: 'history',
    roles,
  },
  {
    id: 4,
    title: t('DeSimilarServices'),
    icon: <SiSimilarweb />,
    key: 'similar',
    roles,
    badge: true,
    countBadge: (data: SingleExpenseDetailType) => data.related_expenses_cnt,
  },
  { id: 5, title: t('DeContractDetail'), icon: <MdGavel />, key: 'contract', roles },
  {
    id: 6,
    title: t('DeReturnExpense'),
    icon: <HiArrowUturnLeft />,
    key: 'reject',
    roles,
  },
  {
    id: 7,
    title: t('DeConfirmExpense'),
    icon: <BsCheckLg />,
    extraCondition: (data: SingleExpenseDetailType, folderId: number | undefined) =>
      !folderId && data.cansendexpense,
    key: 'confirm',
    roles,
  },
];
const style = {
  py: 0.5,
  px: 1.5,
  borderRadius: 1,
  border: 1,
  borderColor: 'grey.300',
  bgcolor: 'background.paper',
  alignItems: 'flex-end',
} as const;

export const ExpenseDetailControl = ({ singleExpense, folderId }: ExpenseDetailControlProps) => {
  const navigate = useNavigate();
  const { includedRole } = useRole();

  const { isOpen: reject, onClose: onCloseReject, onOpen: onOpenReject } = useModal();
  const { isOpen: doctor, onClose: onCloseDoctor, onOpen: onOpenDoctor } = useModal();
  const { isOpen: master, onClose: onCloseMaster, onOpen: onOpenMaster } = useModal();
  const { isOpen: confirm, onClose: onCloseConfirm, onOpen: onOpenConfirm } = useModal();
  const { isOpen: history, onClose: onCloseHistory, onOpen: onOpenHistory } = useModal();
  const { isOpen: similar, onClose: onCloseSimilar, onOpen: onOpenSimilar } = useModal();
  const { isOpen: contract, onClose: onCloseContract, onOpen: onOpenContract } = useModal();

  const ClickMap: Record<any, () => void> = {
    doctor: onOpenDoctor,
    reject: onOpenReject,
    confirm: onOpenConfirm,
    master: onOpenMaster,
    history: onOpenHistory,
    similar: onOpenSimilar,
    contract: onOpenContract,
  };

  const successConfirm = useCallback(() => {
    navigate('/expense');
  }, [navigate]);

  return (
    <>
      <Stack sx={style}>
        <Stack spacing={0.5} direction='row'>
          {Children.toArray(
            CONTROL_DATA.map((btn) => {
              const show =
                includedRole(btn.roles) && (btn?.extraCondition?.(singleExpense, folderId) ?? true);

              if (show) {
                if (btn.badge) {
                  const count = btn.countBadge(singleExpense);
                  return (
                    <Badge
                      badgeContent={count}
                      color='primary'
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Button
                        endIcon={btn.icon}
                        onClick={ClickMap[btn?.key]}
                        variant={count > 0 ? 'outlined' : 'text'}
                      >
                        {btn.title}
                      </Button>
                    </Badge>
                  );
                }
                return (
                  <Button endIcon={btn.icon} onClick={ClickMap[btn?.key]}>
                    {btn.title}
                  </Button>
                );
              } else {
                return null;
              }
            }),
          )}
        </Stack>
      </Stack>

      <CustomModal
        header
        title={t('DeConfirm')}
        open={confirm}
        handleClose={onCloseConfirm}
        sx={{ maxWidth: 700 }}
      >
        <ConfirmExpenseModal
          expenseId={singleExpense.id}
          handleClose={onCloseConfirm}
          afterSend={successConfirm}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('DeReturn')}
        open={reject}
        handleClose={onCloseReject}
        sx={{ maxWidth: 700 }}
      >
        <RejectExpenseModal
          expenseId={singleExpense.id}
          handleClose={onCloseReject}
          afterSend={successConfirm}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('DeSendToSueprAdjuster')}
        open={master}
        handleClose={onCloseMaster}
        sx={{ maxWidth: 700 }}
      >
        <SendToMasterAdjuster
          expenseId={singleExpense.id}
          handleClose={onCloseMaster}
          afterSend={successConfirm}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('DeSendToTrustedDoctor')}
        open={doctor}
        handleClose={onCloseDoctor}
        sx={{ maxWidth: 700 }}
      >
        <SendToTrustedDoctor
          expenseId={singleExpense.id}
          handleClose={onCloseDoctor}
          afterSend={successConfirm}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('DeInsuredHistory')}
        open={history}
        handleClose={onCloseHistory}
        sx={{ maxWidth: 1200 }}
      >
        <InsuredHistory
          insuredId={singleExpense.insured?.id}
          dependantId={singleExpense.dependant?.id}
        />
      </CustomModal>

      <CustomModal
        header
        title={t('DeSimilarServices')}
        open={similar}
        handleClose={onCloseSimilar}
        sx={{ maxWidth: 1200 }}
      >
        {!!singleExpense.topic?.id ? (
          <InsuredHistory
            insuredId={singleExpense.insured?.id}
            dependantId={singleExpense.dependant?.id}
            date={singleExpense.date?.split('T')[0]}
            topic={singleExpense.topic?.id}
          />
        ) : (
          <Typography py={4} color='red' textAlign={'center'}>
            {t('DePlzChooseTopic')}
          </Typography>
        )}
      </CustomModal>

      <CustomModal
        header
        title={t('DeContractDetail')}
        open={contract}
        handleClose={onCloseContract}
        sx={{ maxWidth: 1200 }}
      >
        <ContractDetail contract={singleExpense.contract} />
      </CustomModal>
    </>
  );
};
