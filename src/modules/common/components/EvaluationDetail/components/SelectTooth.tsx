import { toast } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { Children, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { blueGrey } from '@mui/material/colors';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useFormState, useWatch, Control, UseFormSetValue, FieldError } from 'react-hook-form';

//components & utils
import { FaTooth } from 'react-icons/fa';
import { useToothNumbersAPI } from '../hooks';
import { chunkToothPositions } from '../utils';
import { useModal } from 'modules/common/hooks';
import { CustomModal } from 'modules/common/components';
import { useEvaluationAdjustmentContext } from '../context/EvaluationContext';

//types
import { AddPriceValuesType } from './AddPriceForm';

type SelectToothProps = {
  control: Control<AddPriceValuesType, any>;
  setValue: UseFormSetValue<AddPriceValuesType>;
};

const options = { staleTime: 1 * 1000 * 60 * 60 };

export const SelectTooth = ({ control, setValue }: SelectToothProps) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useModal();

  const { mobileUI } = useEvaluationAdjustmentContext();

  const closeModal = useCallback(() => {
    setValue('tooth_number', '');
    onClose();
  }, [onClose, setValue]);

  const {
    data: toothNumberData,
    // isFetching: isToothNumberLoading
  } = useToothNumbersAPI(
    {},
    {
      ...options,
      select: chunkToothPositions,
    },
  );

  const {
    errors: { tooth_number },
  } = useFormState({
    control,
    name: 'tooth_number',
  });
  const selectedTooth = useWatch({
    control,
    name: 'tooth_number',
  });

  const handleCloseAfterSelect = () => {
    if (!selectedTooth) {
      toast.error(tooth_number?.message!);
    } else {
      onClose();
    }
  };

  const handleSelectTooth = (value: string) => {
    if (selectedTooth === value) {
      //remove
      setValue('tooth_number', '');
    } else {
      //add
      setValue('tooth_number', value);
    }
  };

  return (
    <>
      <ToothButton
        variant='outlined'
        startIcon={<FaTooth size={14} />}
        onClick={onOpen}
        tooth_number={tooth_number}
        mobile_ui={mobileUI ? mobileUI.toString() : undefined}
      >
        {t('EvaToothNumber')}
      </ToothButton>

      <CustomModal
        header
        title={t('EvaToothNumber')}
        open={isOpen}
        handleClose={closeModal}
        sx={{ maxWidth: 700 }}
      >
        <Stack spacing={3}>
          {/* <div>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="adult"
                name="radio-buttons-group"
              >
                <FormControlLabel value="adult" control={<Radio size="small" />} label="بزرگ سال" />
                <FormControlLabel value="kid" disabled control={<Radio size="small" />} label="کودک" />
              </RadioGroup>
            </FormControl>
          </div> */}

          <TeethBox>
            {Children.toArray(
              toothNumberData?.map((toothChunk) => {
                const isRight = toothChunk[0].label.includes(t('EvaRight'));

                return (
                  <Stack spacing={1}>
                    <Typography textAlign={isRight ? 'left' : 'right'} sx={{ px: 1 }}>
                      {toothChunk?.at(0)?.label.replace('1', '')}
                    </Typography>

                    <Stack sx={{ p: 1 }} direction={isRight ? 'row' : 'row-reverse'} spacing={1}>
                      {Children.toArray(
                        toothChunk?.map((tooth) => (
                          <ToothBox
                            selected_tooth={selectedTooth}
                            value={tooth.value}
                            onClick={() => handleSelectTooth(tooth.value)}
                          >
                            {tooth.value}
                          </ToothBox>
                        )),
                      )}
                    </Stack>
                  </Stack>
                );
              }),
            )}
          </TeethBox>

          <Stack direction='row' spacing={2} justifyContent='center'>
            <Button variant='outlined' sx={{ width: 110 }} onClick={handleCloseAfterSelect}>
              {t('EvaAdd')}
            </Button>
            <Button sx={{ width: 110 }} variant='outlined' onClick={closeModal} type='button'>
              {t('EvaCancel')}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
};

interface ToothButtonProps {
  mobile_ui?: string;
  tooth_number?: FieldError;
}
interface ToothBoxProps {
  selected_tooth?: string;
  value: string;
}
const ToothButton = styled(Button)<ToothButtonProps>(({ theme, mobile_ui, tooth_number }) => ({
  height: 40,
  borderColor: !!tooth_number ? theme.palette.error.main : blueGrey[200],
  color: !!tooth_number ? theme.palette.error.main : blueGrey[200],
  ...(mobile_ui === 'true'
    ? { width: '96%' }
    : {
        width: '96%',
        [theme.breakpoints.up('lgTablet')]: {
          width: '178px',
        },
      }),
  '&:hover': { borderColor: !!tooth_number ? theme.palette.error.main : blueGrey[200] },
}));
const ToothBox = styled(Stack)<ToothBoxProps>(({ selected_tooth, value, theme }) => ({
  backgroundColor: selected_tooth === value ? 'lightgrey' : 'transparent',
  border: '1px solid',
  borderColor: selected_tooth === value ? 'transparent' : theme.palette.text.disabled,
  color: selected_tooth === value ? theme.palette.text.primary : theme.palette.text.disabled,
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: '30px',
  width: '35px',
}));
const TeethBox = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 3,
  position: 'relative',
  '&::before': {
    content: "''",
    position: 'absolute',
    left: 0,
    right: 0,
    height: '3px',
    borderRadius: 1,
    backgroundColor: 'black',
    top: '50%',
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '3px',
    borderRadius: 1,
    backgroundColor: 'black',
    right: '50%',
  },
}));
