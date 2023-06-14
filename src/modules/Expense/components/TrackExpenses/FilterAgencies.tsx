// import { useCallback } from "react";
// import { LoadingButton } from "@mui/lab";
// import { useForm } from "react-hook-form";
// import { Box, IconButton, Stack, Tooltip } from "@mui/material";

// //components & utils
// import { FiSearch } from 'react-icons/fi';
// import { useCityAPI, useProvinceAPI } from "hooks";
// import { MdOutlineDeleteSweep } from 'react-icons/md';
// import { Autocomplete, Select, TextBox } from "components/shared";

// const options = { staleTime: 1 * 1000 * 60 * 60 };

// export const FilterAgencies = ({ loading, setFilter, defaultValue, pageSet }) => {

//     const { handleSubmit, control, getValues, reset } = useForm({
//         defaultValues: defaultValue,
//     });

//     const {
//         data: provincesData,
//         isInitialLoading: isProvincesLoading
//     } = useProvinceAPI({}, options);
//     const {
//         data: citiesData,
//         isInitialLoading: isCitiesLoading
//     } = useCityAPI({}, options);

//     const onSubmit = useCallback((filters) => {
//         pageSet(1);
//         setFilter(filters);
//     }, [pageSet, setFilter]);

//     const resetForm = useCallback(() => {
//         pageSet(1);
//         reset(defaultValue);
//         setFilter(defaultValue);
//     }, [defaultValue, pageSet, reset, setFilter]);

//     // it is better than dirtyFields, because dirtyFields forces component to re-render
//     const isFieldsDirty = !!getValues(["city", "name", "province"]).filter(Boolean).length

//     return (
//         <Stack
//             component="form"
//             noValidate
//             onSubmit={handleSubmit(onSubmit)}
//             spacing={2}
//             direction={{ zero: "column", tablet: "row" }}
//             alignItems="center"
//         >
//             <Box width={{ zero: 1, tablet: 0.5 }}>
//                 <TextBox.Form
//                     name="name"
//                     control={control}
//                     label="نام مرکز"
//                     fullWidth
//                 />
//             </Box>
//             <Stack direction="row" sx={{ width: 1 }} spacing={2}>
//                 <Select.Form
//                     name="province"
//                     control={control}
//                     label="استان"
//                     isLoading={isProvincesLoading}
//                     defaultSelect={{ label: "همه استان ها", value: "" }}
//                     options={provincesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
//                 />
//                 <Autocomplete.Form
//                     name="city"
//                     control={control}
//                     label="شهر"
//                     defaultSelect={{ label: "همه شهر ها", value: "" }}
//                     options={citiesData?.map((i) => ({ label: i.name, value: i.id })) ?? []}
//                     loading={isCitiesLoading}
//                     loadingText="لطفا صبر کنید..."
//                     freeSolo
//                     disableClearable
//                 />
//             </Stack>
//             <Stack direction="row" sx={{ width: { zero: 1, tablet: "max-content" } }} spacing={2}>
//                 <LoadingButton
//                     type="submit"
//                     variant="contained"
//                     endIcon={<FiSearch />}
//                     sx={{ width: 1 }}
//                     loading={loading}
//                     disabled={loading}
//                 >
//                     جستجو
//                 </LoadingButton>
//                 {isFieldsDirty ? <Box sx={{ alignSelf: "center" }}>
//                     <Tooltip title="حذف فیلتر">
//                         <IconButton color="error" onClick={resetForm}>
//                             <MdOutlineDeleteSweep />
//                         </IconButton>
//                     </Tooltip>
//                 </Box> : null}
//             </Stack>
//         </Stack>
//     )
// }

export {};
