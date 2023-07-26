import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';

//components
import { TiTick } from 'react-icons/ti';
import { FaBuffer } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { BiArchiveIn } from 'react-icons/bi';
import { BsCollectionFill } from 'react-icons/bs';
import { MdOutlineStickyNote2 } from 'react-icons/md';

//utils
import { useModal } from 'modules/common/hooks';

import FanavaranLogo from 'assets/images/fanavaranLogo_prev_ui.png';

//types
type MobileMenuProps = {
  onChosoeClick: () => void;
  onReportClick: () => void;
  onArchiveClick: () => void;
  onFanavaranClick: () => void;
  onAggregationClick: () => void;
  use_fanavaran_api: boolean;
  allowedEdit: boolean;
};

export const MobileMenu = ({
  onChosoeClick,
  onReportClick,
  onArchiveClick,
  onFanavaranClick,
  onAggregationClick,
  use_fanavaran_api,
  allowedEdit,
}: MobileMenuProps) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  const actions = useMemo(
    () => [
      {
        icon: <TiTick size={25} />,
        name: t('TrSelect'),
        onClick: onChosoeClick,
        show: allowedEdit,
      },
      {
        icon: <BiArchiveIn size={25} />,
        name: t('TrArchive'),
        onClick: onArchiveClick,
        show: allowedEdit,
      },
      {
        icon: <MdOutlineStickyNote2 size={25} />,
        name: t('TrReport'),
        onClick: onReportClick,
        show: true,
      },
      {
        icon: <img src={FanavaranLogo} alt='fanavarn' width='22px' height='22px' />,
        name: t('TrFanavaran'),
        onClick: onFanavaranClick,
        show: !!use_fanavaran_api && allowedEdit,
      },
      {
        icon: <BsCollectionFill size={25} />,
        name: t('TrAggregation'),
        onClick: onAggregationClick,
        show: allowedEdit,
      },
    ],
    [
      allowedEdit,
      onAggregationClick,
      onArchiveClick,
      onChosoeClick,
      onFanavaranClick,
      onReportClick,
      t,
      use_fanavaran_api,
    ],
  );

  return (
    <Box>
      <SpeedDial
        ariaLabel='SpeedDial controlled open menu'
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        icon={isOpen ? <IoClose size={25} /> : <FaBuffer size={25} />}
        onClose={onClose}
        onOpen={onOpen}
        open={isOpen}
      >
        {actions.map((action) =>
          action.show ? (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              tooltipPlacement='right'
              onClick={action?.onClick}
            />
          ) : null,
        )}
      </SpeedDial>
    </Box>
  );
};
