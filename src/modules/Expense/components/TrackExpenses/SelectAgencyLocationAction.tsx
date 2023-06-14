// import { useCallback } from 'react';
// import { toast } from 'react-hot-toast';
// import { LoadingButton } from '@mui/lab';
// import { useQueryClient } from '@tanstack/react-query';
// import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

// //components & utils
// import { useModal } from 'hooks';
// import Constants from 'utils/constants';
// import { CustomModal } from 'components/shared';
// import { blueGrey } from '@mui/material/colors';
// import { BiSelectMultiple } from 'react-icons/bi';
// import { ALL_EXPENSES, usePostAgencyLocationAPI } from '../../hooks';

// const onError = () => { toast.error(Constants.PublicFetchError) }

// export const SelectAgencyLocationAction = ({ data, expenseId }) => {
//     const queryClient = useQueryClient();

//     const { isOpen, onOpen, onClose } = useModal();

//     const onSuccess = useCallback(() => {
//         toast.success(Constants.PublicFetchSuccess)
//         queryClient.invalidateQueries([ALL_EXPENSES])
//         onClose()
//     }, [onClose, queryClient])

//     const { mutate: changeLocation, isLoading: isChangingLocation } = usePostAgencyLocationAPI({
//         onError,
//         onSuccess,
//     })

//     return (
//         <>
//             <IconButton
//                 sx={{ color: blueGrey[200] }}
//                 onClick={onOpen}
//             >
//                 <BiSelectMultiple />
//             </IconButton>

//             <CustomModal
//                 header
//                 title="ثبت مرکز اسناد"
//                 open={isOpen}
//                 handleClose={onClose}
//                 sx={{ maxWidth: 700 }}
//             >

//                 <Stack spacing={5} py={1}>
//                     <Stack spacing={1} >
//                         <Typography
//                             align="center"
//                             sx={{ fontSize: "16px !important" }}
//                         >
//                             آیا از ثبت <Box component="span" color="primary.main">{data.name ?? ""}</Box> مطمئن هستید؟
//                         </Typography>
//                         <Typography
//                             align="center"
//                             sx={{ fontSize: "14px !important" }}
//                         >
//                             {data?.description ?? ''}
//                         </Typography>
//                     </Stack>

//                     <Stack direction="row" spacing={3} justifyContent="center">
//                         <LoadingButton
//                             variant="outlined"
//                             sx={{ width: 100 }}
//                             color="success"
//                             onClick={() => changeLocation({ agency: data.id, expense: expenseId })}
//                             disabled={isChangingLocation}
//                         >
//                             تایید
//                         </LoadingButton>
//                         <Button
//                             variant="outlined"
//                             onClick={onClose}
//                             sx={{ width: 100 }}
//                         >
//                             بازگشت
//                         </Button>
//                     </Stack>

//                 </Stack>

//             </CustomModal>
//         </>
//     )
// }

export {};
