import { Children, useCallback, useState } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

//components
import { blueGrey } from '@mui/material/colors';

//utils
import { IMAGE_CONTROL } from 'modules/common/components/EvaluationDetail/utils';

//types
type ImageDocProps = {
  src: string;
};

export const ImageDoc = ({ src }: ImageDocProps) => {
  const [rotate, setRotate] = useState(0);

  const handleRotate = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      setRotate((p) => p + 1);
    } else {
      setRotate((p) => p - 1);
    }
  }, []);

  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Stack
            spacing={1}
            sx={{
              position: 'absolute',
              top: 25,
              left: 25,
              zIndex: (theme) => theme.zIndex.appBar - 1,
              display: { zero: 'none', tablet: 'flex' },
            }}
          >
            {Children.toArray(
              IMAGE_CONTROL.map((i) => {
                return (
                  <Box
                    sx={{ bgcolor: '#FFF', borderRadius: '50%', border: 1 }}
                    component={i.callbackKey === 'download' ? 'a' : 'div'}
                    {...(i.callbackKey === 'download' && { download: 'image-doc', href: src })}
                  >
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
                width: '100%',
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
                src={src}
                alt=''
              />
            </div>
          </TransformComponent>
        </Box>
      )}
    </TransformWrapper>
  );
};
