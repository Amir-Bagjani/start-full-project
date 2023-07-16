import { Box, Typography } from '@mui/material';
import { PrintExpenseExtraDataResponse, PrintExpenseResponse } from 'services/models';

//util
import { DateFormat } from 'utils/helper';

//type
type ExpenseInfoProps = {
  data?: PrintExpenseResponse;
  extraPrintData?: PrintExpenseExtraDataResponse;
};

const style = {
  p: 2,
  gap: 1,
  border: 1,
  columnGap: 7,
  display: 'grid',
  borderRadius: 1,
  gridTemplateColumns: 'repeat(auto-fit, minmax(30%, 1fr))',
};

export const ExpenseInfo = ({ data, extraPrintData }: ExpenseInfoProps) => {
  const Expensedate = data?.[0]?.date ? DateFormat.fPersianDate(data[0].date) : '';
  const contractStartDate = extraPrintData?.[0]?.contract_strat_date
    ? DateFormat.fPersianDate(extraPrintData?.[0]?.contract_strat_date)
    : '';
  const contractEndDate = extraPrintData?.[0]?.contract_end_date
    ? DateFormat.fPersianDate(extraPrintData?.[0]?.contract_end_date)
    : '';

  if (data && data?.length > 1)
    return (
      <Box sx={style}>
        <Typography>بیمه گذار : {extraPrintData?.[0]?.insurer ?? ''}</Typography>
        <Typography>تاریخ شروع بیمه نامه: {contractStartDate}</Typography>
        <Typography>تاریخ انقضاء بیمه نامه: {contractEndDate}</Typography>
        <Typography>تاریخ هزینه : </Typography>
        <Typography>کد رهگیری : </Typography>
      </Box>
    );

  return (
    <Box sx={style}>
      <Typography>بیمه گذار : {extraPrintData?.[0]?.insurer ?? ''}</Typography>
      <Typography>تاریخ شروع بیمه نامه: {contractStartDate}</Typography>
      <Typography>تاریخ انقضاء بیمه نامه: {contractEndDate}</Typography>
      <Typography>تاریخ هزینه : {Expensedate}</Typography>
      <Typography>کد رهگیری : {data?.[0]?.tracking_code ?? ''}</Typography>
    </Box>
  );
};
