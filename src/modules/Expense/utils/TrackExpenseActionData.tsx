import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import {
  ADMIN_R,
  EDITOR_R,
  COUNTER_R,
  INSURED_R,
  REPORTER_R,
  ADJUSTER_R,
  RECEIPTIONICT_R,
  SUPERADJUSTER_R,

  // INSURER_R,
  // REGISTRAR_R,
  // LOSSADJUSTER_R,
  // TRUSTEDDOCTOR_R,
} from 'utils/constants';
import {
  MdOutlineMonitor,
  MdOutlineCancelPresentation,
  MdOutlineCancel,
  // MdEdit,
  // MdOutlineEditNote,
  // MdOutlineCheckCircle,
} from 'react-icons/md';
import { BsPrinter } from 'react-icons/bs';
import { FiBarChart2 } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';
// import { TbHeartRateMonitor } from 'react-icons/tb';

export const TRACK_EXPENSE_ACTION_DATA = [
  {
    title: 'کارشناسی',
    icon: <MdOutlineMonitor />,
    component: Box,
    key: 'expenseAdjust',
    componentProps: () => ({}),
    roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R, RECEIPTIONICT_R],
  },
  // {
  //     title: "جزئیات هزینه",
  //     icon: <TbHeartRateMonitor />,
  //     component: Link,
  //     componentProps: (id) => ({ to: `/expense/${id}` }),
  //     roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R, RECEIPTIONICT_R, REGISTRAR_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R, INSURER_R]
  //     // roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R, RECEIPTIONICT_R, COUNTER_R, REGISTRAR_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R, INSURER_R]
  // },
  {
    title: 'لاگ هزینه',
    icon: <FiBarChart2 />,
    component: Box,
    key: 'log',
    componentProps: () => ({}),
    roles: [ADMIN_R, EDITOR_R, REPORTER_R, ADJUSTER_R, COUNTER_R, SUPERADJUSTER_R, RECEIPTIONICT_R],
  },
  {
    title: 'پرینت',
    icon: <BsPrinter />,
    component: Link,
    componentProps: (id: number) => ({ to: `/expense/print/${id}`, target: '_blank' }),
    roles: [EDITOR_R],
  },
  {
    title: 'پرینت',
    icon: <BsPrinter />,
    component: Link,
    componentProps: (id: number, ids: number[]) => ({
      to: `/expense/print/${id}?expenses=${ids.join(',')}`,
      target: '_blank',
    }),
    roles: [ADMIN_R, COUNTER_R],
  },
  // {
  //     title: "افزودن توضیحات",
  //     icon: <MdOutlineEditNote />,
  //     component: Box,
  //     key: "comment",
  //     componentProps: () => ({}),
  //     roles: [ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R]
  // },
  // {
  //     title: "تایید هزینه",
  //     icon: <MdOutlineCheckCircle />,
  //     component: Box,
  //     key: "confirm",
  //     componentProps: () => ({}),
  //     roles: [REGISTRAR_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R, INSURER_R]
  // },
  {
    title: 'عودت هزینه',
    icon: <MdOutlineCancel />,
    component: Box,
    key: 'reject',
    componentProps: () => ({}),
    roles: [RECEIPTIONICT_R, ADJUSTER_R],
    // roles: [RECEIPTIONICT_R, REGISTRAR_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R, INSURER_R]
  },
  // {
  //     title: "ویرایش",
  //     icon: <MdEdit />,
  //     component: Link,
  //     componentProps: (id) => ({ to: `/expense/${id}` }),
  //     roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R, RECEIPTIONICT_R, REGISTRAR_R, INSURER_R, TRUSTEDDOCTOR_R, LOSSADJUSTER_R]
  //     // roles: [ADMIN_R, ADJUSTER_R, SUPERADJUSTER_R, EDITOR_R, COUNTER_R, RECEIPTIONICT_R, REGISTRAR_R, INSURER_R, TRUSTEDDOCTOR_R, LOSSADJUSTER_R]
  // },
  // {
  //     title: "ویرایش",
  //     icon: <MdEdit />,
  //     component: Link,
  //     componentProps: (id) => ({ to: `/expense/${id}` }),
  //     roles: [INSURED_R],
  //     extraCondition: (data) => !!data.caneditexpense
  // },
  {
    title: 'انتخاب مرکز اسناد',
    icon: <IoLocationSharp />,
    component: Box,
    key: 'agency',
    componentProps: () => ({}),
    roles: [ADMIN_R, INSURED_R],
  },
  {
    title: 'ابطال',
    icon: <MdOutlineCancelPresentation />,
    component: Box,
    key: 'cancellation',
    componentProps: () => ({}),
    roles: [ADMIN_R, EDITOR_R],
  },
  // {
  //     title: "بایگانی",
  //     icon: <BiArchiveIn />,
  //     component: Box,
  //     key: "archive",
  //     componentProps: () => ({}),
  //     roles: [INSURED_R, COUNTER_R],
  //     extraCondition: (data) => !!data.candeleteexpense
  // },
];
