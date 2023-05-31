import { t } from 'i18next';
import { ROUTES_NAME } from 'routes/routesName';
import {
  AdjusterCardIcon,
  AgencyCardIcon,
  CityCardIcon,
  ContractCardIcon,
  HelpCardIcon,
  OrganizationCardIcon,
  SaleCardIcon,
  TeamworkCardIcon,
  TowerCardIcon,
} from 'assets/customIcons';

export const BASE_CARD_DATA = [
  {
    path: ROUTES_NAME.base.province,
    label: t('BaseProvince'), //'استان',
    iconUrl: <TowerCardIcon />,
  },
  {
    path: ROUTES_NAME.base.city,
    label: t('BaseCity'), //'شهر',
    iconUrl: <CityCardIcon />,
  },
  {
    path: ROUTES_NAME.base.organization,
    label: t('BaseOrganization'), //'سازمان',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.company,
    label: t('BaseCompany'), //'شرکت',
    iconUrl: <TeamworkCardIcon />,
  },
  {
    path: ROUTES_NAME.base.contracttype,
    label: t('BaseContract'), //'نوع قرارداد',
    iconUrl: <ContractCardIcon />,
  },
  {
    path: ROUTES_NAME.base.adjustertype,
    label: t('BaseAdjusterType'), //'نوع کارشناس',
    iconUrl: <AdjusterCardIcon />,
  },
  {
    path: ROUTES_NAME.base.topic,
    label: t('BaseTopic'), //'بیماری',
    iconUrl: <SaleCardIcon />,
  },
  {
    path: ROUTES_NAME.base.damagetype,
    label: t('BaseDamageType'), //'انواع خسارت',
    iconUrl: <SaleCardIcon />,
  },
  {
    path: ROUTES_NAME.base.damagedocumenttype,
    label: t('BaseDamageDocType'), //'انواع مدرک خسارت',
    iconUrl: <SaleCardIcon />,
  },

  {
    path: ROUTES_NAME.base.message,
    label: t('BaseMessage'), //'راهنما',
    iconUrl: <HelpCardIcon />,
  },

  {
    path: ROUTES_NAME.base.agency,
    label: t('BaseAgency'), //'نمایندگی ها',
    iconUrl: <AgencyCardIcon />,
  },
];
