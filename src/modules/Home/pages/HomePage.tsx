import { Children } from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

//components
import { Card, DocumentTitle } from 'modules/common/components';

//utils
import { useRole } from 'modules/common/hooks';
import { CARD_DATA } from '../utils/CARD_DATA';

const HomePage = () => {
  const { t } = useTranslation();
  const { includedRole } = useRole();

  return (
    <DocumentTitle title={t('MainPage') as string}>
      <CardWrapper>
        {Children.toArray(
          CARD_DATA.map((card) => {
            return includedRole(card.roles) ? <Card data={card} /> : null;
          }),
        )}
      </CardWrapper>
    </DocumentTitle>
  );
};

export default HomePage;

const CardWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 8 * theme.shape.borderRadius,
  columnGap: 5 * theme.shape.borderRadius,
  paddingBlock: 5 * theme.shape.borderRadius,
}));
