import { t } from 'i18next';
import { TooltipProps } from '@mui/material';

//components
import { TbResize } from 'react-icons/tb';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';
import { BiRotateRight, BiRotateLeft } from 'react-icons/bi';

//types
import { ReactNode } from 'react';

export type ImgControl = {
  id: number;
  title: string;
  placement: TooltipProps['placement'];
  icon: ReactNode;
  callbackKey: 'rotateRight' | 'rotateLeft' | 'zoomIn' | 'zoomOut' | 'reset' | 'download';
};

export const IMAGE_CONTROL: ImgControl[] = [
  {
    id: 1,
    title: t('EvaTurnRight'),
    placement: 'left',
    icon: <BiRotateRight />,
    callbackKey: 'rotateRight',
  },
  {
    id: 2,
    title: t('EvaTurnLeft'),
    placement: 'left',
    icon: <BiRotateLeft />,
    callbackKey: 'rotateLeft',
  },
  { id: 3, title: t('EvaZoomIn'), placement: 'left', icon: <TfiZoomIn />, callbackKey: 'zoomIn' },
  {
    id: 4,
    title: t('EvaZoomOut'),
    placement: 'left',
    icon: <TfiZoomOut />,
    callbackKey: 'zoomOut',
  },
  {
    id: 5,
    title: t('EvaInitialState'),
    placement: 'left',
    icon: <TbResize />,
    callbackKey: 'reset',
  },
];
