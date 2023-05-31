import { t } from 'i18next';
import { ROUTES_NAME } from 'routes/routesName';
import { OrganizationCardIcon } from 'assets/customIcons';

export const BASE_CARD_DATA = [
  {
    path: ROUTES_NAME.base.province,
    label: t('BaseProvince'), //'استان',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.city,
    label: t('BaseCity'), //'شهر',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.organization,
    label: t('BaseOrganization'), //'سازمان',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.company,
    label: t('BaseCompany'), //'شرکت',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.contracttype,
    label: t('BaseContract'), //'نوع قرارداد',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.adjustertype,
    label: t('BaseAdjusterType'), //'نوع کارشناس',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.topic,
    label: t('BaseTopic'), //'بیماری',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.damagetype,
    label: t('BaseDamageType'), //'انواع خسارت',
    iconUrl: <OrganizationCardIcon />,
  },
  {
    path: ROUTES_NAME.base.damagedocumenttype,
    label: t('BaseDamageDocType'), //'انواع مدرک خسارت',
    iconUrl: <OrganizationCardIcon />,
  },

  {
    path: ROUTES_NAME.base.message,
    label: t('BaseMessage'), //'راهنما',
    iconUrl: <OrganizationCardIcon />,
  },

  {
    path: ROUTES_NAME.base.agency,
    label: t('BaseAgency'), //'نمایندگی ها',
    iconUrl: <OrganizationCardIcon />,
  },
];
