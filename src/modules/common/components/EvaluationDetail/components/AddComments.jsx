import { useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

//components & utils
import { useModal } from 'hooks';
import { BiCommentAdd } from 'react-icons/bi';
import { CustomModal, Select, TextBox } from 'components/shared';
import { useSampleDescriptionAPI } from 'features/feature_transfer/hooks';

export const AddComments = ({ control, setValue }) => {
  const { isOpen, onClose, onOpen } = useModal();

  const closeModal = useCallback(() => {
    setValue('comments', '');
    onClose();
  }, [onClose, setValue]);

  const { data: sampleDescriptions, isInitialLoading } = useSampleDescriptionAPI(
    {
      type: 6, //hardcoded value for adjuster comments
    },
    {
      staleTime: 1 * 1000 * 60 * 60,
    },
  );

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<BiCommentAdd />}
        onClick={onOpen}
        sx={{
          width: { zero: 1, lgTablet: 178 },
          color: blueGrey[200],
          borderColor: blueGrey[200],
          height: 56,
          '&:hover': { borderColor: blueGrey[200] },
        }}
      >
        توضیحات
      </Button>

      <CustomModal
        header
        title='توضیحات'
        open={isOpen}
        handleClose={closeModal}
        sx={{ maxWidth: 700 }}
      >
        <Stack spacing={5} py={1}>
          <Stack direction='column' spacing={3}>
            <Select.Form
              name='comments'
              control={control}
              label='توضیحات'
              isLoading={isInitialLoading}
              defaultSelect={{ label: '', value: '' }}
              options={
                sampleDescriptions?.map((i) => ({
                  label: i.description,
                  value: i.description,
                })) || []
              }
            />
            <TextBox.Form
              name='comments'
              control={control}
              label='توضیحات بیشتر'
              multiline
              rows={4}
            />
          </Stack>

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button variant='outlined' sx={{ width: 110 }} onClick={onClose}>
              افزودن
            </Button>
            <Button sx={{ width: 110 }} variant='outlined' onClick={closeModal} type='button'>
              حذف
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
