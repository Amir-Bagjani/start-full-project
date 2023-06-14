// import { useCallback } from "react"
// import { toast } from "react-hot-toast"
// import { LoadingButton } from "@mui/lab"
// import { useForm } from "react-hook-form"
// import { useQueryClient } from "@tanstack/react-query"
// import { Button, Stack, Typography } from "@mui/material"

// //components & utils
// import Constants from "utils/constants"
// import { ALL_EXPENSES } from "../../hooks"
// import { TextBox } from "components/shared"
// import { useEditExpenseAPI } from "features/EvaluationDetail/hooks"

// export const AddCommentModal = ({ handleClose, data }) => {

//     const queryClient = useQueryClient();

//     const { control, handleSubmit } = useForm({
//         defaultValues: {
//             comments: data.comments ?? "",
//         },
//     })

//     const onError = useCallback((error) => {
//         if (error.Error === "only registrar,counter,editor,admin and insured roles can change an expense") {
//             toast.error("شما دسترسی تغییرات را ندارید")
//         } else {
//             toast.error(Constants.PublicFetchError)
//         }
//     }, [])
//     const onSuccess = useCallback(() => {
//         toast.success(Constants.PublicFetchSuccess)
//         queryClient.invalidateQueries([ALL_EXPENSES]);
//         handleClose()
//     }, [handleClose, queryClient])

//     const { mutate: editExpense, isLoading: isEdittingxpense } = useEditExpenseAPI({
//         onError,
//         onSuccess,
//     });

//     const onSubmit = useCallback((formdata) => {
//         editExpense({
//             expenseId: data.id,
//             data: formdata
//         })
//     }, [data.id, editExpense])

//     return (
//         <Stack spacing={2} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
//             <Typography>توضیحات را اضافه کنید : </Typography>

//             <TextBox.Form
//                 name="comments"
//                 control={control}
//                 label="توضیحات"
//                 multiline
//                 rows={4}
//                 rules={{ required: { value: true, message: " توضیحات را وارد کنید" } }}
//             />

//             <Stack direction="row" spacing={3} justifyContent="center">
//                 <LoadingButton
//                     type="submit"
//                     variant="outlined"
//                     sx={{ minWidth: 100 }}
//                     color="success"
//                     disabled={isEdittingxpense}
//                 >
//                     ذخیره تغییرات
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
