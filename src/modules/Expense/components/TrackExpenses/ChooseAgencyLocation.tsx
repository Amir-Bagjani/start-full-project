// import { useCallback, useMemo, useState } from "react";
// import { Box, Stack, Typography } from "@mui/material";

// //components & utils
// import { useAgenciesAPI } from "hooks";
// import { FilterAgencies } from "./FilterAgencies";
// import { NewDataGridTable } from "components/shared";
// import { columnsDataAgencies as columns } from "../../utils";
// import { SelectAgencyLocationAction } from "./SelectAgencyLocationAction";

// const PageSize = 30;

// const defaultValues = {
//   province: "",
//   city: "",
//   name: "",
// };

// const styles = {
//   container: { display: "flex", justifyContent: "center", gap: 10, alignItems: "center" },
//   baxWrapper: { border: 1, borderRadius: 1, borderColor: "grey.300", width: "max-content" },
//   header: { bgcolor: "grey.A200", borderBottom: 1, borderColor: "grey.300", fontSize: 14, p: 1 },
// }

// export const ChooseAgencyLocation = ({ data }) => {
//   const [page, setPage] = useState(1);
//   const [filter, filterSet] = useState(defaultValues);

//   const setFilter = useCallback((e) => filterSet(e), []);
//   const pageSet = useCallback((e) => setPage(e), []);

//   const { data: agencies, isInitialLoading: isAgenciesLoading } = useAgenciesAPI(
//     {
//       page,
//       ...filter
//     }
//   );

//   const selectColumn = useMemo(() => [
//     {
//       field: "select",
//       headerName: "انتخاب",
//       width: 70,
//       renderCell: (params) => <SelectAgencyLocationAction
//         data={params.row}
//         expenseId={data.id}
//       />
//     },
//   ], [data.id])

//   return (
//     <Stack spacing={2} >

//       <Box sx={styles.container}>
//         <Box sx={styles.baxWrapper}>
//           <Box sx={styles.header}>
//             <Typography align="center" fontWeight="bold">
//               تحویل سند
//             </Typography>
//           </Box>
//           <Stack p={2} direction={{ zero: "column", tablet: "row" }} spacing={3}>
//             <Typography>  نام مرکز :  {data?.delivery_agency?.name ?? "-"}</Typography>
//             <Typography>   آدرس مرکز:  {data?.delivery_agency?.address ?? "-"}</Typography>
//           </Stack>
//         </Box>
//       </Box>

//       <FilterAgencies
//         loading={isAgenciesLoading}
//         setFilter={setFilter}
//         defaultValue={defaultValues}
//         pageSet={pageSet}
//       />

//       <NewDataGridTable
//         loading={isAgenciesLoading}
//         rows={agencies?.results ?? []}
//         columns={selectColumn.concat(columns)}
//         dataGridProps={{
//           checkboxSelection: false,
//         }}
//         paginatable={agencies?.count > PageSize}
//         paginationProps={{
//           currentPage: page,
//           lastPage: (Math.ceil((agencies?.count ?? 0) / PageSize)),
//           maxLength: 7,
//           onChange: pageSet,
//         }}
//       />

//     </Stack>
//   )
// }

export {};
