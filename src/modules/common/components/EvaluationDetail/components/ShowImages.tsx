import { Children } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { Box, IconButton, Stack, Typography } from '@mui/material';

//components
import { MdClose } from 'react-icons/md';

//types
import { ExpenseDocResponse } from 'services/models';

//types
type ShowImagesProps = {
  handleClose: () => void;
  data: ExpenseDocResponse;
  setImgSrc: (s: string) => void;
};

//style
const headerStyle = {
  p: 2,
  pr: 0,
  color: 'text.disabled',
  borderBottom: '1px solid',
  borderColor: 'text.disabled',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  bgcolor: 'background.paper',
} as const;

export const ShowImages = ({ handleClose, data, setImgSrc }: ShowImagesProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={headerStyle}>
      <Stack direction='row' alignItems='center' spacing={3} justifyContent='space-between'>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>{t('EvaShowImg')}</Typography>

        <Stack direction='row-reverse' alignItems='center' spacing={1}>
          <IconButton onClick={handleClose}>
            <MdClose size={28} />
          </IconButton>

          <Stack direction='row' spacing={1}>
            {Children.toArray(
              data.map((item) => (
                <Box
                  src={item.file}
                  component='img'
                  alt=''
                  sx={{
                    width: 40,
                    border: 1,
                    height: 40,
                    borderRadius: 1,
                    cursor: 'pointer',
                    borderColor: blueGrey[100],
                  }}
                  onClick={() => setImgSrc(item.file)}
                />
              )),
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
