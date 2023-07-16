import { Box, Collapse, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Children, useCallback, useState } from 'react';

//components
import { ImageDoc } from '../../common/ImageDoc';
import { ExpenseDocSkeleton } from '../../common';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { Button, EvaluationDetail } from 'modules/common/components';
import { ShowAdjustmentList } from 'modules/common/components/EvaluationDetail/components';

//utils
import { useModal } from 'modules/common/hooks';
import { SINGLE_EXPENSE } from 'modules/ExpenseDetail/hooks';
import { useExpenseDocAPI } from 'modules/common/components/EvaluationDetail/hooks';

//types
import { ExpenseDocResponse, ExpenseDocType, SingleExpenseDetailType } from 'services/models';

type ExpenseAdjustmentSectionProps = {
  singleExpense: SingleExpenseDetailType;
};
type ImageListProps = {
  setImageSrc: (s: string) => void;
  id: number;
  imgSrc: string;
};

export const ExpenseAdjustmentSection = ({ singleExpense }: ExpenseAdjustmentSectionProps) => {
  const expenseId = singleExpense.id;
  const queryClient = useQueryClient();

  const [imgSrc, imgSrcSet] = useState<string | null>(null);

  const { isOpen, onToggle } = useModal(true);

  const successAdjustment = useCallback(() => {
    queryClient.invalidateQueries([SINGLE_EXPENSE, { expenseId }]);
  }, [expenseId, queryClient]);

  const setImageSrc = useCallback((e: string) => {
    imgSrcSet(e);
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        border: 1,
        borderColor: 'grey.300',
        p: 1.5,
        borderRadius: 1,
        bgcolor: 'background.paper',
        ...(!isOpen && { pb: 0 }),
      }}
    >
      <Stack spacing={1.5} direction='row' alignItems='center' sx={{ minHeight: 48 }}>
        <Button
          variant='outlined'
          onClick={onToggle}
          startIcon={isOpen ? <BsArrowsCollapse /> : <BsArrowsExpand />}
          sx={{ minWidth: 'max-content' }}
        >
          کارشناسی
        </Button>
        <Stack
          component='span'
          justifyContent='center'
          sx={{
            width: 1,
            height: '100%',
            py: 0.5,
            px: 1.5,
          }}
        >
          فرم کارشناسی
        </Stack>
        <ImageList setImageSrc={setImageSrc} imgSrc={imgSrc!} id={expenseId} />
      </Stack>
      <Collapse in={isOpen}>
        <Stack spacing={3}>
          <Stack direction='row' spacing={1}>
            <Box sx={{ width: 1, maxWidth: 0.4 }}>
              <EvaluationDetail
                data={singleExpense as any}
                updateExpenses={successAdjustment}
                updateDataAfterAddAdjustment={successAdjustment}
                pageView
                mobileUI
              />
            </Box>
            <Box sx={{ width: 1, maxWidth: 0.6 }}>{!!imgSrc && <ImageDoc src={imgSrc} />}</Box>
          </Stack>

          <ShowAdjustmentList
            expenseId={expenseId}
            updateDataAfterAddAdjustment={successAdjustment}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
};

const ImageList = ({ setImageSrc, id, imgSrc }: ImageListProps) => {
  const onSuccess = useCallback(
    (d: ExpenseDocResponse) => {
      setImageSrc((d.at(-1) as ExpenseDocType).file);
    },
    [setImageSrc],
  );

  const { data: expenseDoc, isInitialLoading: isexpenseDocLoading } = useExpenseDocAPI(
    {
      expenseId: id,
    },
    {
      onSuccess,
    },
  );

  return (
    <Stack direction='row' flexWrap='wrap' sx={{ width: 1, gap: 1 }}>
      {isexpenseDocLoading ? (
        <ExpenseDocSkeleton />
      ) : (
        Children.toArray(
          expenseDoc?.map((item) => (
            <Box
              src={item.file}
              component='img'
              alt=''
              sx={{
                width: 40,
                outline:
                  imgSrc === item.file ? (t) => `4px solid ${t.palette.primary.main}` : 'none',
                height: 40,
                borderRadius: 1,
                cursor: 'pointer',
                outlineOffset: '3px',
              }}
              onClick={() => setImageSrc(item.file)}
            />
          )),
        )
      )}
    </Stack>
  );
};
