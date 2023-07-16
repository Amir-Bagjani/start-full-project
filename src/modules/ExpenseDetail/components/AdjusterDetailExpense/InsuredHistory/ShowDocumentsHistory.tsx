import { blueGrey } from '@mui/material/colors';
import { useCallback, Children, useState, memo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, Stack, Tooltip, IconButton, CircularProgress } from '@mui/material';

//components
import { BsFillImageFill } from 'react-icons/bs';
import { CustomModal } from 'modules/common/components';
import { ShowImages } from 'modules/common/components/EvaluationDetail/components/ShowImages';

//utils
import { useModal } from 'modules/common/hooks';
import { IMAGE_CONTROL } from 'modules/common/components/EvaluationDetail/utils';
import { useExpenseDocAPI } from 'modules/common/components/EvaluationDetail/hooks';

//types
import { Theme } from '@mui/material/styles';
import { ExpenseDocResponse } from 'services/models';

type ShowDocumentsHistoryProps = {
  expenseId: number;
};
type ImgDocProps = {
  expenseId: number;
};
type ImgModalProps = {
  src: string;
  data: ExpenseDocResponse;
};

const styles = {
  loadingContainer: { width: '100%', height: 'inherit' },
  imageContainer: {
    width: 100,
    border: 1,
    height: 100,
    borderRadius: 1,
    cursor: 'pointer',
    borderColor: blueGrey[100],
  },
  modal: {
    maxWidth: 'max-content',
    maxHeight: 'max-content',
    height: 'auto',
    minWidth: 0.5,
    minHeight: '70vh',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  controller: {
    position: 'fixed',
    top: 100,
    left: 25,
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
    display: { zero: 'none', tablet: 'flex' },
  },
  img: {
    border: 1,
    borderColor: blueGrey[100],
    borderRadius: 1,
    width: '100%',
    objectFit: 'fill',
  },
} as const;

export const ShowDocumentsHistory = ({ expenseId }: ShowDocumentsHistoryProps) => {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Tooltip title='اسناد'>
        <IconButton sx={{ color: blueGrey[200] }} onClick={onOpen}>
          <BsFillImageFill />
        </IconButton>
      </Tooltip>

      <CustomModal header title='اسناد' open={isOpen} handleClose={onClose} sx={{ maxWidth: 700 }}>
        <ImgDoc expenseId={expenseId} />
      </CustomModal>
    </>
  );
};

const ImgDoc = ({ expenseId }: ImgDocProps) => {
  const { data, isInitialLoading } = useExpenseDocAPI(
    {
      expenseId,
    },
    {
      enabled: !!expenseId,
    },
  );

  if (isInitialLoading)
    return (
      <Stack alignItems='center' justifyContent='center' sx={styles.loadingContainer}>
        <CircularProgress size={20} color='primary' />
      </Stack>
    );

  return (
    <Stack
      spacing={1}
      direction='row'
      alignItems='center'
      justifyContent='center'
      sx={{ flexWrap: 'wrap' }}
    >
      {Children.toArray(data?.map((item) => <ImgModal src={item.file} data={data} />))}
    </Stack>
  );
};

const ImgModal = memo(({ src, data }: ImgModalProps) => {
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
      <Box src={src} component='img' alt='' sx={styles.imageContainer} onClick={handleOpen} />

      {open && (
        <CustomModal open={open} handleClose={handleClose} sx={styles.modal} bodySx={{ pt: 0 }}>
          <div>
            <ShowImages handleClose={handleClose} data={data} setImgSrc={setImgSrc} />
            <Box sx={styles.imageWrapper}>
              <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Stack spacing={1} sx={styles.controller}>
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
                        <img style={styles.img} loading='lazy' width='100%' src={imgSrc} alt='' />
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
