import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Children, Dispatch, SetStateAction, useLayoutEffect, useMemo, useState } from 'react';

//components
import { Card, DocumentTitle } from 'modules/common/components';

//utils
import {
  INSURED_R,
  ADJUSTER_R,
  LOSSADJUSTER_R,
  SUPERADJUSTER_R,
  TRUSTEDDOCTOR_R,
} from 'utils/constants';
import { useLoadInsurdMeAPI } from '../hooks';
import { CARD_DATA, CARD_DATA_KEY } from '../utils';
import { useRole, useUser } from 'modules/common/hooks';

//types
import type { CardData } from '../utils';
import NotActiveContract from './NotActiveContract';

const hideCard = (setData: Dispatch<SetStateAction<CardData[]>>, key: CardData['key'][]) => {
  setData((pre) => {
    return pre.map((i) => (key.includes(i.key) ? { ...i, hide: true } : i));
  });
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const HomePage = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const { includedRole, isInsured } = useRole();

  const [cardData, setCardData] = useState(() => CARD_DATA);

  const [nullAccess, setNullAccess] = useState<Boolean>(false);

  const { data: insuredData, isInitialLoading: isInsuredLoading } = useLoadInsurdMeAPI(
    {},
    { enabled: isInsured }, // enable when user was insured
  );

  const isActive = insuredData?.is_active ?? true; //deafult true means user is not insured

  useLayoutEffect(() => {
    //if there is no card, show "NoAccessContract"
    const card = cardData.filter((card) => includedRole(card.roles));
    setNullAccess(!Boolean(card.length));
  }, [cardData, includedRole]);

  useMemo(() => {
    //for adjusters
    if (includedRole([ADJUSTER_R, SUPERADJUSTER_R, LOSSADJUSTER_R, TRUSTEDDOCTOR_R])) {
      //if expense registration is not allowed, do not show "EXPENSES"
      if (!user?.ExpenseRegistrationIsAllowed) hideCard(setCardData, [CARD_DATA_KEY.expense]);
      //if complaint registration is not allowed, do not show "COMPLAINT"
      if (!user?.ComplaintRegistrationIsAllowed) hideCard(setCardData, [CARD_DATA_KEY.complaint]);
    }

    //for insured
    if (includedRole([INSURED_R])) {
      //if expense registration is not allowed, do not show "EXPENSES & ADD_EXPENSE"
      if (!user?.ExpenseRegistrationIsAllowed) {
        hideCard(setCardData, [CARD_DATA_KEY.expense, CARD_DATA_KEY.addExpense]);
      }
      //if complaint registration is not allowed, do not show "COMPLAINT & ADD_COMPLAINT"
      if (!user?.ComplaintRegistrationIsAllowed) {
        hideCard(setCardData, [CARD_DATA_KEY.complaint, CARD_DATA_KEY.addComplaint]);
      }
    }
  }, [includedRole, user?.ComplaintRegistrationIsAllowed, user?.ExpenseRegistrationIsAllowed]);

  if (nullAccess) {
    return <NotActiveContract>{t('NoAccessContract')}</NotActiveContract>;
  }

  return (
    <DocumentTitle title={t('MainPage') as string}>
      {isInsuredLoading && 'loading...'}

      {!isInsuredLoading && isActive && (
        <CardWrapper variants={container} initial='hidden' animate='visible'>
          {Children.toArray(
            cardData.map((card: CardData) => {
              return includedRole(card.roles) && !!!card.hide ? <Card data={card} /> : null;
            }),
          )}
        </CardWrapper>
      )}

      {!isInsuredLoading && !isActive && <NotActiveContract>{t('InactiveAcc')}</NotActiveContract>}
    </DocumentTitle>
  );
};

export default HomePage;

const CardWrapper = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 8 * theme.shape.borderRadius,
  columnGap: 5 * theme.shape.borderRadius,
  paddingBlock: 6 * theme.shape.borderRadius,
}));
