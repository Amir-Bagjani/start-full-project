import { TbResize } from 'react-icons/tb';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';
import { BiRotateRight, BiRotateLeft } from 'react-icons/bi';
import { TooltipProps } from '@mui/material';
import { ReactNode } from 'react';

export type ImgControl = {
  id: number;
  title: string;
  placement: TooltipProps['placement'];
  icon: ReactNode;
  callbackKey: 'rotateRight' | 'rotateLeft' | 'zoomIn' | 'zoomOut' | 'reset';
};

export const IMAGE_CONTROL: ImgControl[] = [
  {
    id: 1,
    title: 'چرخش به راست',
    placement: 'left',
    icon: <BiRotateRight />,
    callbackKey: 'rotateRight',
  },
  {
    id: 2,
    title: 'چرخش به چپ',
    placement: 'left',
    icon: <BiRotateLeft />,
    callbackKey: 'rotateLeft',
  },
  { id: 3, title: 'بزرگ نمایی', placement: 'left', icon: <TfiZoomIn />, callbackKey: 'zoomIn' },
  { id: 4, title: 'کوچک نمایی', placement: 'left', icon: <TfiZoomOut />, callbackKey: 'zoomOut' },
  { id: 5, title: 'حالت اولیه', placement: 'left', icon: <TbResize />, callbackKey: 'reset' },
];
