// import { useCallback } from 'react';
// import { toast } from 'react-hot-toast';
// import { LoadingButton } from '@mui/lab';
// import { useQueryClient } from '@tanstack/react-query';
// import { Box, Button, Stack, Typography } from '@mui/material';

// //components & utils
// import Constants from 'utils/constants';
// import { ALL_EXPENSES } from '../../hooks';
// import { useAddActionExpenseAPI } from 'features/feature_transfer/hooks';
// import { useForm } from 'react-hook-form';
// import { TextBox } from 'components/shared';

// const onError = () => { toast.error(Constants.PublicFetchError) }

// export const CancellationExpenseModal = ({ handleClose, data }) => {

//     const queryClient = useQueryClient();

//     const { control, handleSubmit } = useForm({
//         defaultValues: {
//             expense: data.id,
//             actiontype: 6, /*hardcoded value for cancel expense*/
//             actionreason: "",
//         }
//     })

//     const onSuccess = useCallback(() => {
//         toast.success(Constants.PublicFetchSuccess);
//         queryClient.invalidateQueries([ALL_EXPENSES]);
//         handleClose();
//     }, [handleClose, queryClient])

//     const { mutate: editExpense, isLoading: isEditingExpense } = useAddActionExpenseAPI(
//         { onError, onSuccess }
//     )

//     const onSubmit = useCallback((data) => {
//         editExpense(data)
//     }, [editExpense])

//     const insuredName = data.insured.user?.profile?.first_name + " " + data.insured.user?.profile?.last_name;
//     const dependantName = data.dependant?.first_name + " " + data.dependant?.last_name;

//     return (
//         <Stack spacing={5} py={1} component="form" noValidate
//             onSubmit={
//                 (e) => {
//                     e.stopPropagation();
//                     return handleSubmit(onSubmit)(e);
//                 }
//             }>
//             <Typography
//                 align="center"
//                 sx={{ fontSize: "16px !important" }}
//             >
//                 آیا از ابطال هزینه  <Box component="span" color="primary.main">
//                     {data?.topic?.name ?? ""}{" - "}{data?.dependant ? dependantName : insuredName}
//                 </Box> مطمئن هستید؟
//             </Typography>

//             <TextBox.Form
//                 name="actionreason"
//                 control={control}
//                 label="دلیل ابطال"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 rules={{ required: { value: true, message: " دلیل ابطال را وارد کنید" } }}
//             />

//             <Stack direction="row" spacing={3} justifyContent="center">
//                 <LoadingButton
//                     variant="outlined"
//                     sx={{ width: 100 }}
//                     color="success"
//                     type="submit"
//                     // onClick={() => editExpense({ expense: data.id, actiontype: 6, /*hardcoded value for cancel expense*/ })}
//                     disabled={isEditingExpense}
//                 >
//                     تایید
//                 </LoadingButton>
//                 <Button
//                     variant="outlined"
//                     onClick={handleClose}
//                     sx={{ width: 100 }}
//                 >
//                     بازگشت
//                 </Button>
//             </Stack>

//         </Stack>
//     )
// }

export {};
