import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { Control, UseFormSetValue } from 'react-hook-form';

//components
import { BiCommentAdd } from 'react-icons/bi';
import { Button, CustomModal, Select, TextBox } from 'modules/common/components';

//utils
import { useModal, useSampleDescriptionAPI } from 'modules/common/hooks';

//types
import type { AddPriceValuesType } from './AddPriceForm';

type AddCommentsProps = {
  control: Control<AddPriceValuesType, any>;
  setValue: UseFormSetValue<AddPriceValuesType>;
};

export const AddComments = ({ control, setValue }: AddCommentsProps) => {
  const { isOpen, onClose, onOpen } = useModal();

  const { t } = useTranslation();

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
          // height: 56,
          '&:hover': { borderColor: blueGrey[200] },
        }}
      >
        {t('EvaComments')}
      </Button>

      <CustomModal
        header
        title={t('EvaComments')}
        open={isOpen}
        handleClose={closeModal}
        sx={{ maxWidth: 700 }}
      >
        <Stack spacing={5} py={1}>
          <Stack direction='column' spacing={3}>
            <Select.Form
              name='comments'
              control={control}
              label={t('EvaComments')}
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
              label={t('EvaMoreComments')}
              multiline
              rows={4}
            />
          </Stack>

          <Stack direction='row' spacing={3} justifyContent='center'>
            <Button variant='outlined' sx={{ width: 110 }} onClick={onClose}>
              {t('EvaAdd')}
            </Button>
            <Button sx={{ width: 110 }} variant='outlined' onClick={closeModal} type='button'>
              {t('EvaRemove')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};
