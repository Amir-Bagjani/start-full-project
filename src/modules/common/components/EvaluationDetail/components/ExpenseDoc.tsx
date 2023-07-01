import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { Children, memo, useCallback, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, Stack, Tooltip, IconButton, Typography, CircularProgress } from '@mui/material';

//components
import { ShowImages } from './ShowImages';
import { ExpenseTypeForm } from './ExpenseTypeForm';
import { CustomModal } from 'modules/common/components';

//utils
import { IMAGE_CONTROL } from '../utils';
import { NumberFormat } from 'utils/helper';
import { useExpenseDocAPI } from '../hooks';
import { useModal } from 'modules/common/hooks';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

//types
import { ExpenseDocResponse } from 'services/models';

type ImgModalProps = {
  src: string;
  data: ExpenseDocResponse;
  width?: number;
  height?: number;
};

export const ExpenseDoc = () => {
  const { t } = useTranslation();

  const { expense, mobileUI, expenseId, pageView } = useEvaluationAdjustmentContext();

  const { amount, topic, expense_type, cost_center_type } = expense;

  const { data, isInitialLoading } = useExpenseDocAPI(
    {
      expenseId: expenseId as number,
    },
    {
      enabled: !!expenseId && !pageView,
    },
  );

  if (isInitialLoading)
    return (
      <Stack alignItems='center' justifyContent='center' sx={{ width: '100%', height: 'inherit' }}>
        <CircularProgress size={20} color='primary' />
      </Stack>
    );

  return (
    <Stack
      direction={mobileUI ? 'column-reverse' : { zero: 'column-reverse', smLaptop: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      spacing={4}
      sx={{
        border: '0.5px solid',
        borderRadius: 1,
        p: 1,
        borderColor: (t) => (t.palette.mode === 'light' ? blueGrey[100] : 'text.disabled'),
        bgcolor: (t) => (t.palette.mode === 'light' ? blueGrey[50] : 'transparent'),
      }}
    >
      <Stack
        direction={mobileUI ? 'column' : { zero: 'column', tablet: 'row' }}
        spacing={2}
        alignItems='center'
      >
        <Typography>
          {t('EvaAmount')} : {amount ? NumberFormat.separateNum(amount) : '-'}
        </Typography>
        <Typography>
          {t('EvaTopic')} : {topic?.name ?? '-'}
        </Typography>
        <ExpenseTypeForm expense_type={expense_type} cost_center_type={cost_center_type} />
      </Stack>

      {!pageView && (
        <Stack spacing={1} direction='row' sx={{ flexWrap: 'wrap' }}>
          {Children.toArray(data?.map((item) => <ImgModal src={item.file} data={data} />))}
        </Stack>
      )}
    </Stack>
  );
};

const ImgModal = memo(({ src, data, width, height }: ImgModalProps) => {
  const [imgSrc, imgSrcSet] = useState(src);

  const [rotate, setRotate] = useState(0);
  const handleRotate = useCallback((direction: 'right' | 'left') => {
    if (direction === 'right') {
      setRotate((p) => p + 1);
    } else {
      setRotate((p) => p - 1);
    }
  }, []);

  const setImgSrc = useCallback((s: string) => {
    imgSrcSet(s);
  }, []);

  const { isOpen: open, onOpen: handleOpen, onClose: handleClose } = useModal();

  return (
    <>
      <Box
        src={src}
        component='img'
        alt=''
        sx={{
          width: width ?? 38,
          border: 1,
          height: height ?? 38,
          borderRadius: 1,
          cursor: 'pointer',
          borderColor: blueGrey[100],
        }}
        onClick={handleOpen}
      />

      {open && (
        <CustomModal
          open={open}
          handleClose={handleClose}
          sx={{
            maxWidth: 'max-content',
            maxHeight: 'max-content',
            height: 'auto',
            minWidth: 0.5,
            minHeight: '70vh',
          }}
          bodySx={{ pt: 0 }}
        >
          <div>
            <ShowImages handleClose={handleClose} data={data} setImgSrc={setImgSrc} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
              }}
            >
              <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Stack
                      spacing={1}
                      sx={{
                        position: 'fixed',
                        top: 100,
                        left: 25,
                        zIndex: (theme) => theme.zIndex.modal + 1,
                        display: { zero: 'none', tablet: 'flex' },
                      }}
                    >
                      {Children.toArray(
                        IMAGE_CONTROL.map((i) => {
                          return (
                            <Box sx={{ bgcolor: '#FFF', borderRadius: '50%' }}>
                              <Tooltip title={i.title} placement={i.placement}>
                                <IconButton
                                  onClick={() => {
                                    switch (i.callbackKey) {
                                      case 'rotateRight':
                                        return handleRotate('right');
                                      case 'rotateLeft':
                                        return handleRotate('left');
                                      case 'zoomIn':
                                        return zoomIn();
                                      case 'zoomOut':
                                        return zoomOut();
                                      case 'reset':
                                        return (() => {
                                          resetTransform();
                                          setRotate(0);
                                        })();

                                      default:
                                        return undefined;
                                    }
                                  }}
                                  sx={{ color: blueGrey[400] }}
                                >
                                  {i.icon}
                                </IconButton>
                              </Tooltip>
                            </Box>
                          );
                        }),
                      )}
                    </Stack>
                    <TransformComponent>
                      <div
                        style={{
                          transform: `rotateZ(${90 * rotate}deg)`,
                          transition: 'transform 0.2s',
                        }}
                      >
                        <img
                          style={{
                            border: 1,
                            borderColor: blueGrey[100],
                            borderRadius: 1,
                            width: '100%',
                            objectFit: 'fill',
                          }}
                          loading='lazy'
                          width='100%'
                          src={imgSrc}
                          alt=''
                        />
                      </div>
                    </TransformComponent>
                  </Box>
                )}
              </TransformWrapper>
            </Box>
          </div>
        </CustomModal>
      )}
    </>
  );
});
