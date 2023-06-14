// import { useCallback } from "react";
// import { toast } from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { Stack, Button } from "@mui/material";
// import { useQueryClient } from "@tanstack/react-query";

// //components & utils
// import Constants from "utils/constants";
// import {
//     useAddActionExpenseAPI,
//     useSampleDescriptionAPI,
// } from "features/feature_transfer/hooks";
// import { ALL_EXPENSES } from "../../hooks";
// import { Select, TextBox } from "components/shared";

// const onError = () => { toast.error(Constants.PublicFetchError) }

// export const RejectExpenseModal = ({ handleClose, expenseId }) => {

//     const queryClient = useQueryClient();

//     const onSuccess = useCallback(() => {
//         queryClient.invalidateQueries([ALL_EXPENSES])
//         toast.success(Constants.PublicFetchSuccess)
//         handleClose()
//     }, [handleClose, queryClient])

//     const { mutate: actionExpense, isLoading: isReturningExpense } = useAddActionExpenseAPI(
//         { onError, onSuccess }
//     )

//     const { data: sampleDescriptions, isInitialLoading } = useSampleDescriptionAPI(
//         {
//             type: 1, //hardcoded value for return type
//         }
//         ,
//         {
//             staleTime: 1 * 1000 * 60 * 60
//         }
//     )

//     const { handleSubmit, control } = useForm({
//         defaultValues: {
//             actionreason: "",
//             actiontype: 2,//hardcoded value for return expense
//         },
//     })

//     const onSubmit = useCallback((data) => {

//         actionExpense({
//             expense: expenseId,
//             ...data
//         })

//     }, [expenseId, actionExpense])

//     return (
//         <Stack
//             spacing={5}
//             py={1}
//             component="form"
//             noValidate
//             onSubmit={
//                 (e) => {
//                     e.stopPropagation();
//                     return handleSubmit(onSubmit)(e);
//                 }
//             }
//         >
//             <Stack direction="column" spacing={3}>
//                 <Select.Form
//                     name="actionreason"
//                     control={control}
//                     label="توضیحات"
//                     isLoading={isInitialLoading}
//                     defaultSelect={{ label: "", value: "" }}
//                     options={sampleDescriptions?.map((i) => ({ label: i.description, value: i.description })) || []}
//                 />
//                 <TextBox.Form
//                     name="actionreason"
//                     control={control}
//                     label="توضیحات بیشتر"
//                     multiline
//                     rows={4}
//                     rules={{ required: { value: true, message: " توضیحات را وارد کنید" } }}
//                 />
//             </Stack>

//             <Stack direction="row" spacing={3} justifyContent="center">
//                 <Button
//                     variant="outlined"
//                     sx={{ width: 120 }}
//                     color="error"
//                     type="submit"
//                     disabled={isReturningExpense}
//                 >
//                     عودت هزینه
//                 </Button>
//                 <Button
//                     sx={{ width: 120 }}
//                     variant="outlined"
//                     onClick={handleClose}
//                     type="button"
//                 >
//                     بازگشت
//                 </Button>
//             </Stack>

//         </Stack >
//     )
// }

export {};
