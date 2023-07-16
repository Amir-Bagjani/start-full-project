import { Box } from '@mui/material';

import {
  ADMIN_R,
  EDITOR_R,
  COUNTER_R,
  INSURED_R,
  REPORTER_R,
  ADJUSTER_R,
  RECEIPTIONICT_R,
  SUPERADJUSTER_R,
  REGISTRAR_R,

  // INSURER_R,
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
import { t } from 'i18next';
// import { TbHeartRateMonitor } from 'react-icons/tb';

export const TRACK_EXPENSE_ACTION_DATA = [
  {
    title: t('ExAdjustment'),
    icon: <MdOutlineMonitor />,
    component: Box,
    key: 'expenseAdjust',
    // componentProps: () => ({}),
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
    title: t('ExLog'),
    icon: <FiBarChart2 />,
    component: Box,
    key: 'log',
    // componentProps: () => ({}),
    roles: [ADMIN_R, EDITOR_R, REPORTER_R, ADJUSTER_R, COUNTER_R, SUPERADJUSTER_R, RECEIPTIONICT_R],
  },
  {
    title: t('ExPrint'),
    icon: <BsPrinter />,
    component: Box,
    // componentProps: () => ({}),
    roles: [ADMIN_R, COUNTER_R, EDITOR_R, REGISTRAR_R],
    key: 'print',
  },
  // {
  //   title: t('ExPrint'),
  //   icon: <BsPrinter />,
  //   component: Link,
  //   componentProps: (id: number) => ({ to: `/expense/print/${id}`, target: '_blank' }),
  //   roles: [EDITOR_R],
  // },
  // {
  //   title: t('ExPrint'),
  //   icon: <BsPrinter />,
  //   component: Link,
  //   componentProps: (id: number, ids: number[]) => ({
  //     to: `/expense/print/${id}?expenses=${ids.join(',')}`,
  //     target: '_blank',
  //   }),
  //   roles: [ADMIN_R, COUNTER_R],
  // },
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
    title: t('ExRejectExpense'),
    icon: <MdOutlineCancel />,
    component: Box,
    key: 'reject',
    // componentProps: () => ({}),
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
    title: t('ExChooseAgency'),
    icon: <IoLocationSharp />,
    component: Box,
    key: 'agency',
    // componentProps: () => ({}),
    roles: [ADMIN_R, INSURED_R],
  },
  {
    title: t('ExCancell'),
    icon: <MdOutlineCancelPresentation />,
    component: Box,
    key: 'cancellation',
    // componentProps: () => ({}),
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
