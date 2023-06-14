// import { useCallback } from "react";
// import { toast } from "react-hot-toast";
// import { LoadingButton } from "@mui/lab";
// import { useForm } from "react-hook-form";
// import { useQueryClient } from "@tanstack/react-query";
// import { Stack, Button, Typography } from "@mui/material";

// //components & utils
// import { useRole } from "hooks";
// import Constants from "utils/constants";
// import { ALL_EXPENSES } from "../../hooks";
// import { TextBox } from "components/shared";
// import { useAddActionExpenseAPI } from "features/feature_transfer/hooks";

// const onError = () => { toast.error(Constants.PublicFetchError) }

// export const ConfirmExpenseModal = ({ handleClose, expenseId }) => {
//     const queryClient = useQueryClient();

//     const { isAdjuster } = useRole()

//     const onSuccess = useCallback(() => {
//         queryClient.invalidateQueries([ALL_EXPENSES])
//         toast.success(Constants.PublicFetchSuccess)
//         handleClose()
//     }, [handleClose, queryClient])

//     const { mutate: actionExpense, isLoading: isEdittingExpense } = useAddActionExpenseAPI(
//         { onError, onSuccess }
//     )

//     const { handleSubmit, control } = useForm({
//         defaultValues: {
//             actionreason: "",
//         },
//     })

//     const confirm = useCallback((data) => {
//         actionExpense({
//             expense: expenseId,
//             data: {
//                 ...data,
//                 actiontype: 1, //hardcoded value for confirm expense
//             }
//         })
//     }, [expenseId, actionExpense])

//     const sendExpensetoMaster = useCallback((data) => {
//         actionExpense({
//             expense: expenseId,
//             data: {
//                 ...data,
//                 actiontype: 5, //hardcoded value for send expense to master
//             }
//         })
//     }, [expenseId, actionExpense])

//     return (
//         <Stack spacing={2} component="form" noValidate onSubmit={handleSubmit(confirm)}>
//             <Typography>توضیحات را اضافه کنید : </Typography>

//             <TextBox.Form
//                 name="actionreason"
//                 control={control}
//                 label="توضیحات"
//                 multiline
//                 rows={4}
//                 rules={{ required: { value: true, message: " توضیحات را وارد کنید" } }}
//             />

//             <Stack direction="row" spacing={3} justifyContent="center">
//                 {isAdjuster ?
//                     <LoadingButton
//                         type="button"
//                         variant="outlined"
//                         sx={{ minWidth: 100 }}
//                         color="success"
//                         onClick={handleSubmit(sendExpensetoMaster)}
//                         disabled={isEdittingExpense}
//                     >
//                         ارسال به کارشناس ارشد
//                     </LoadingButton>
//                     : null}
//                 <LoadingButton
//                     type="submit"
//                     variant="outlined"
//                     sx={{ minWidth: 100 }}
//                     color="success"
//                     disabled={isEdittingExpense}
//                 >
//                     تایید هزینه
//                 </LoadingButton>
//                 <Button
//                     variant="outlined"
//                     onClick={handleClose}
//                     sx={{ minWidth: 100 }}
//                 >
//                     بازگشت
//                 </Button>
//             </Stack>

//         </Stack>
//     )
// }

export {};
