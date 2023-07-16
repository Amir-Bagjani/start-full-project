import { Divider, Skeleton, Stack, Typography } from '@mui/material';

// utils
import { DateFormat, NumberFormat } from 'utils/helper';

//types
import {
  ExpenseType,
  PrintExpenseResponse,
  PrintExpenseExtraDataType,
  PrintExpenseExtraDataResponse,
} from 'services/models';
import { useTranslation } from 'react-i18next';

type ExpenseDetailTableProps = {
  loading?: boolean;
  data?: PrintExpenseResponse;
  extraPrintData?: PrintExpenseExtraDataResponse;
};
type PrintRowProps = {
  index: number;
  data: ExpenseType;
  extraPrintData?: PrintExpenseExtraDataResponse;
};

const styles = {
  container: {
    // '& table': { border: 1, borderColor: 'text.disabled' },
    // '& table th': { border: ' text.disabled' },
    '& table thead tr th': { fontSize: '11px' },
    '& table tbody tr td': { fontSize: '11px' },
    '& table thead tr th:nth-of-type(n + 7)': {
      bgcolor: 'grey.200',
    },
  },
  loading: { bgcolor: 'grey.200', width: 1, height: 100 },
  printText: {
    '@media screen': {
      minWidth: 455,
    },
  },
} as const;

const findExpense = (
  data: PrintExpenseExtraDataResponse,
  id: number | string,
): PrintExpenseExtraDataType => data?.find((i) => i.id === id)!;

export const ExpenseDetailTable = ({ data, loading, extraPrintData }: ExpenseDetailTableProps) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={0} sx={styles.container}>
      <Stack direction='row' p={1}>
        <Typography className='print-text' textAlign='center' sx={styles.printText}>
          {t('PrPrescriptionOutpationInfo')}
        </Typography>
        <Typography textAlign='center' sx={{ width: 1 }}>
          {t('PrAdjustmentCalculation')}
        </Typography>
      </Stack>

      {loading ? (
        <Skeleton variant='rectangular' animation='wave' sx={styles.loading} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t('PrNumber')}</th>
              <th>{t('PrInsured')}</th>
              <th>{t('PrNatioanalCode')}</th>
              <th>{t('PrExpenseSubject')}</th>
              <th>{t('PrExpenseDate')}</th>
              <th>{t('PrExpenseAmount')}</th>
              <th>{t('PrTopic')}</th>
              <th>{t('PrExpenseAmount')}</th>
              <th>{t('PrDeduction')}</th>
              <th>{t('PrExpenseInObligation')}</th>
              <th>
                <Stack>
                  {t('PrBaseInsurance')}
                  <Divider />
                  {t('PrFranchise')}
                </Stack>
              </th>
              <th>
                <Stack>
                  <span>{t('PrDiffrenceFranchise')}</span>
                  <span>{t('PrAndBaseInsurance')}</span>
                </Stack>
              </th>
              <th>{t('PrAmount')}</th>
              <th>
                <Stack>
                  <span>{t('PrReturnReason')}</span>
                  <span>{t('PrFilureToPay')}</span>
                </Stack>
              </th>
              <th>
                <Stack>
                  <span>{t('PrReturnDate')}</span>
                  <span>{t('PrFilureToPay')}</span>
                </Stack>
              </th>
              <th>{t('PrInsurancePolicy')}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <PrintRow data={item} key={index} index={index} extraPrintData={extraPrintData} />
            ))}
          </tbody>
        </table>
      )}
    </Stack>
  );
};

const PrintRow = ({ data, index, extraPrintData }: PrintRowProps) => {
  const { amount, insured, dependant, adjustprice, reject_reason, reject_date } = data;
  const insuredName = insured
    ? insured.user?.profile?.first_name + ' ' + insured.user?.profile?.last_name
    : '';
  const dependantName = dependant ? dependant?.first_name + ' ' + dependant?.last_name : '';
  const insuredNationalcode = data.insured.user.profile.national_code;
  const dependantNationalcode = data.dependant?.nationalcode;
  const Expensedate = DateFormat.fPersianDate(data.date);
  const ExpenseAmount = NumberFormat.separateNum(amount);
  const deductions = data.adjustprice !== 0 ? Number(amount) - Number(adjustprice) : 0;
  const rejectDate = reject_date ? DateFormat.fPersianDate(reject_date) : '';

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{dependantName ? dependantName : insuredName}</td>
      <td>{dependantNationalcode ? dependantNationalcode : insuredNationalcode}</td>
      <td>{data.expense_type?.name ?? ''}</td>
      <td>{Expensedate}</td>
      <td>{ExpenseAmount}</td>
      <td>{data.topic?.name ?? ''}</td>
      <td>{ExpenseAmount}</td>
      <td>{NumberFormat.separateNum(deductions ?? '')}</td>
      <td>
        {NumberFormat.separateNum(
          (findExpense(extraPrintData!, data.id)?.professinal_technical_cost ?? '') as number,
        )}
      </td>
      <td>
        <Stack>
          <span>
            {NumberFormat.separateNum(
              findExpense(extraPrintData!, data.id)?.baseinsurance_amount ?? '',
            )}
          </span>
          <span>{findExpense(extraPrintData!, data.id)?.franchise}</span>
        </Stack>
      </td>
      <td>0</td>
      <td>{NumberFormat.separateNum(adjustprice ?? '')}</td>
      <td>{reject_reason ?? ''}</td>
      <td>{rejectDate}</td>
      <td>{findExpense(extraPrintData!, data.id)?.insurancepolicy_name ?? ''}</td>
    </tr>
  );
};
