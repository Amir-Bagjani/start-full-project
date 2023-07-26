import { toast } from 'react-hot-toast';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { red, teal } from '@mui/material/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Stack, Tooltip, Typography, CircularProgress } from '@mui/material';

//components
import { MobileMenu } from './MobileMenu';
import { Button } from 'modules/common/components';
import { SendFanavaranBtn } from './SendFanavaranBtn';
import { AggregationModal } from '../AggregationModal';
import { ArchiveTransferModal } from './ArchiveTransferModal';
import { EditSelectedTransferListForm } from './EditSelectedTransferListForm';
import { ChooseTransferModal, ShowSelectedExpensesForTransfer } from '../AddNewTransfer';
import { MdOutlineCancel, MdCheckCircleOutline, MdOutlineStickyNote2 } from 'react-icons/md';

//utils
import { DateFormat } from 'utils/helper';
import { Constants } from 'utils/constants';
import { useRole } from 'modules/common/hooks';
import { addTransferValidation } from '../../utils';
import { useTransferListSingleAPI } from '../../hooks';

//types
import { SingleTransferListResponse, TransferType } from 'services/models';

type PickIconProps = {
  condition: boolean;
};
type EditTransferModalProps = {
  data: TransferType | null;
};
export type EditTransferValue = {
  expenses: number[];
  title: string;
  date: string | null;
  insurance_policy: string | number;
  expensesToAdd: number[];
};

const styles = {
  container: {
    mb: 1,
    display: 'flex',
    flexDirection: { zero: 'column', tablet: 'row' },
    justifyContent: 'center',
    gap: { zero: 2, tablet: 10 },
    alignItems: 'center',
  },
  baxWrapper: {
    border: 1,
    borderRadius: 1,
    borderColor: 'grey.300',
    width: { zero: 1, tablet: 'max-content' },
  },
  header: {
    bgcolor: 'grey.A200',
    borderBottom: 1,
    borderColor: 'grey.300',
    fontSize: 14,
    p: 1,
  },
  typographyWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 2,
    '& .MuiTypography-root': { displaty: 'flex', minWidth: 'max-content' },
  },
  loading: {
    minHeight: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const;

const defaultValues = {
  expenses: [],
  title: '',
  date: null,
  insurance_policy: '',

  expensesToAdd: [],
};
const onError = () => {
  toast.error(Constants.PublicFetchError);
};

const PickIcon = ({ condition }: PickIconProps) => {
  return condition ? (
    <MdCheckCircleOutline color={teal[200]} size={24} />
  ) : (
    <MdOutlineCancel color={red[200]} size={24} />
  );
};

export const EditTransferModal = ({ data }: EditTransferModalProps) => {
  const { id, is_archived } = data!;

  const { t } = useTranslation();

  const { isAdmin } = useRole();
  const allowedEdit = !is_archived || isAdmin;

  const chooseRef = useRef({} as HTMLButtonElement);
  const reportRef = useRef({} as HTMLButtonElement);
  const archiveRef = useRef({} as HTMLButtonElement);
  const fanavaranRef = useRef({} as HTMLButtonElement);
  const aggregationRef = useRef({} as HTMLButtonElement);

  const methods = useForm<EditTransferValue>({
    resolver: yupResolver(addTransferValidation),
    defaultValues,
  });
  const { reset } = methods;

  const onSuccess = useCallback(
    (data: SingleTransferListResponse) => {
      reset({
        ...defaultValues,
        insurance_policy: data.insurance_policy.id,
        expenses: data.expenses.map((i) => i.id),
        title: data.title,
        date: data.date,
      });
    },
    [reset],
  );

  const { data: singleTransferList, isFetching: isLoadingSingleTransferList } =
    useTransferListSingleAPI(
      {
        id,
      },
      {
        enabled: !!id,
        onSuccess,
        onError,
      },
    );

  const use_fanavaran_api = singleTransferList?.insurance_policy?.use_fanavaran_api ?? false;

  return (
    <FormProvider {...methods}>
      <Stack spacing={4}>
        {isLoadingSingleTransferList && (
          <Box sx={styles.loading}>
            <CircularProgress color='primary' />
          </Box>
        )}
        {!isLoadingSingleTransferList && (
          <>
            <Box sx={styles.container}>
              <Box sx={styles.baxWrapper}>
                <Box sx={styles.header}>
                  <Typography align='center' fontWeight='bold'>
                    {t('TrDetail')}
                    <Box component='span' sx={{ color: (theme) => theme.palette.primary.main }}>
                      {' '}
                      {singleTransferList?.title}
                    </Box>
                  </Typography>
                </Box>
                <Stack p={2} direction='row' spacing={3} sx={styles.typographyWrapper}>
                  <Typography>
                    {' '}
                    {t('TrTitle')} : {singleTransferList?.title}
                  </Typography>
                  <Typography>
                    {' '}
                    {t('TrInsurancePolicy')} :{' '}
                    {singleTransferList?.insurance_policy?.name ?? t('TrInsurancePolicy')}
                  </Typography>
                  <Typography>
                    {t('TrDate')} :{' '}
                    {singleTransferList?.date
                      ? DateFormat.fPersianDate(singleTransferList?.date)
                      : '-'}
                  </Typography>
                  <Typography>
                    {' '}
                    {t('TrCreatedDate')} : {DateFormat.fPersianDate(singleTransferList?.created_at)}
                  </Typography>
                  <Typography>
                    {' '}
                    {t('TrIsArchived')} {singleTransferList?.is_archived ? t('TrYes') : t('TrNo')}
                  </Typography>
                </Stack>
                {use_fanavaran_api && (
                  <Stack p={2} direction='row' spacing={3} sx={styles.typographyWrapper}>
                    <Typography> {t('TrStateOfSendToFanavaran')} : </Typography>

                    <Tooltip title={singleTransferList?.doc_acceptance_id ?? ''}>
                      <Typography>
                        {t('TrAcceptanceId')}:{' '}
                        <PickIcon condition={!!singleTransferList?.doc_acceptance_id} />
                      </Typography>
                    </Tooltip>

                    <Tooltip title={singleTransferList?.claim_id ?? ''}>
                      <Typography>
                        {t('TrClaimId')} <PickIcon condition={!!singleTransferList?.claim_id} />
                      </Typography>
                    </Tooltip>

                    <Tooltip title={singleTransferList?.draft_id ?? ''}>
                      <Typography>
                        {t('TrDraftId')} <PickIcon condition={!!singleTransferList?.draft_id} />
                      </Typography>
                    </Tooltip>
                  </Stack>
                )}
              </Box>
              <>{allowedEdit && <EditSelectedTransferListForm data={singleTransferList} />}</>
            </Box>

            <Stack spacing={2}>
              {/* mobile menu */}
              <Box sx={{ display: { zero: 'block', tablet: 'none' } }}>
                <MobileMenu
                  allowedEdit={allowedEdit}
                  use_fanavaran_api={use_fanavaran_api}
                  onChosoeClick={() => chooseRef.current?.click()}
                  onReportClick={() => reportRef.current?.click()}
                  onArchiveClick={() => archiveRef.current?.click()}
                  onFanavaranClick={() => fanavaranRef.current?.click()}
                  onAggregationClick={() => aggregationRef.current?.click()}
                />
              </Box>

              {/* desktop menu */}
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{ display: { zero: 'none', tablet: 'flex' } }}
              >
                {allowedEdit && <ChooseTransferModal id={id} ref={chooseRef} />}
                {allowedEdit && <ArchiveTransferModal id={id} ref={archiveRef} />}
                <Button
                  href={`${process.env.REACT_APP_BASE_URL}darman/expense/exportasexcel/?transfer=${id}`}
                  rel='noopener noreferrer'
                  color='primary'
                  variant='outlined'
                  ref={reportRef}
                  endIcon={<MdOutlineStickyNote2 />}
                  sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                >
                  {t('TrDownloadReport')}
                </Button>
                {allowedEdit && use_fanavaran_api && (
                  <SendFanavaranBtn id={id} ref={fanavaranRef} />
                )}
                {allowedEdit && <AggregationModal id={id} ref={aggregationRef} />}
              </Stack>

              <Box sx={{ pb: 8 }}>
                <ShowSelectedExpensesForTransfer
                  id={id}
                  is_archived={!allowedEdit}
                  expensesShowList={singleTransferList?.expenses ?? []}
                  use_fanavaran_api={use_fanavaran_api}
                />
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </FormProvider>
  );
};
