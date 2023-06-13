import {
  Box,
  Fade,
  Modal,
  Stack,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  SwipeableDrawer,
} from '@mui/material';
import { Global } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { Fragment, forwardRef, memo } from 'react';

//components
import { MdClose } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';

//utils
import { useHelpMessageAPI, useModal } from 'modules/common/hooks';

// styles
import { headerStyle, style, bodyStyle, tabletBodyStyle, globalSx, pullerStyle } from './styles';

//types
import type { ForwardedRef, ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

//type definition
type Ref = ForwardedRef<HTMLDivElement>;

type CustomModalProps = {
  sx?: SxProps<Theme>;
  handleClose: () => void;
  onOpen?: () => void;
  open: boolean;
  children: ReactNode;
  header?: ReactNode;
  title?: ReactNode;
  information?: string;
  bodySx?: SxProps<Theme>;
  disableTabletModal?: boolean;
};

export const CustomModal = memo(
  forwardRef<Ref, CustomModalProps>((props, ref) => {
    const {
      sx = {},
      handleClose,
      onOpen = () => {},
      open,
      children,
      header,
      title,
      information,
      bodySx = {},
      disableTabletModal = false,
    } = props;

    const { t } = useTranslation();

    const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'));

    const { isOpen: openInfo, onClose: onCloseInfo, onOpen: onOpenInfo } = useModal();

    const { data, isInitialLoading } = useHelpMessageAPI(
      {
        query: information ?? '',
      },
      {
        enabled: !!information,
      },
    );

    const desktopModal = (
      <Modal open={open} onClose={handleClose} onDoubleClick={(e) => e.stopPropagation()}>
        <Fade in={open}>
          <Box ref={ref} sx={{ ...style, ...sx }}>
            <Box sx={headerStyle} style={{ display: header ? 'block' : 'none' }}>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='subtitle1' color='text.primary'>
                  {title}
                </Typography>

                <Stack direction='row' spacing={-0.5}>
                  {!!information && (
                    <IconButton onClick={onOpenInfo}>
                      <FaQuestionCircle size={28} color={blueGrey[200]} />
                    </IconButton>
                  )}

                  <IconButton onClick={handleClose}>
                    <MdClose size={28} />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ ...bodyStyle, ...bodySx }}>{children}</Box>
          </Box>
        </Fade>
      </Modal>
    );

    const tabletModal = (
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={handleClose}
        onOpen={onOpen}
        disableSwipeToOpen
        PaperProps={{
          className: 'custom-modal',
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Box sx={headerStyle} style={{ display: header ? 'block' : 'none' }}>
            <Box sx={pullerStyle} />
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='subtitle1' color='text.primary'>
                {title}
              </Typography>
              {!!information && (
                <IconButton onClick={onOpenInfo}>
                  <FaQuestionCircle size={28} color={blueGrey[200]} />
                </IconButton>
              )}
            </Stack>
          </Box>

          <Box sx={{ ...tabletBodyStyle, ...bodySx }}>{children}</Box>
        </Box>
      </SwipeableDrawer>
    );

    return (
      <>
        {/* style for mobile modal*/}
        <Global styles={globalSx} />

        {disableTabletModal ? desktopModal : tablet ? tabletModal : desktopModal}

        {!!information && (
          <Modal open={openInfo} onClose={onCloseInfo}>
            <Fade in={openInfo}>
              <Box ref={ref} sx={{ ...style, maxWidth: 500, p: 2, textAlign: 'center' }}>
                {isInitialLoading ? (
                  <Typography>{t('ModalPlsWait')}</Typography>
                ) : (
                  <Stack spacing={2} mb={2}>
                    <Typography>{t('ModalGuide')}</Typography>
                    {!!data &&
                      data?.results.map((i, index) => (
                        <Fragment key={index}>
                          <Typography color='primary.main'>{i?.title ?? ''}</Typography>
                          <Typography>{i?.description ?? ''}</Typography>
                        </Fragment>
                      ))}
                  </Stack>
                )}
                <Button onClick={onCloseInfo} type='button'>
                  {t('ModalBack')}
                </Button>
              </Box>
            </Fade>
          </Modal>
        )}
      </>
    );
  }),
);
