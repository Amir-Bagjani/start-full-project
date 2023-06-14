import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { Container, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';

//utils
import { HiChevronLeft } from 'react-icons/hi';
import { ROUTES_NAME } from 'routes/routesName';

const CrumbsMap: any = {
  '/': 'صفحه اصلی',
  expenses: 'هزینه ها',
  add: 'اضافه',
};

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  let routeTo = '';
  const pathnames = pathname.split('/').filter(Boolean);

  return (
    <Container sx={{ maxWidth: '1260px', mt: 1, mb: 2.5 }} component='section'>
      <MUIBreadcrumbs aria-label='breadcrumb' separator={<HiChevronLeft />}>
        {pathnames.length ? (
          <ChipLink style={{ cursor: 'pointer' }} to={ROUTES_NAME.home}>
            {CrumbsMap['/']}
          </ChipLink>
        ) : null}

        {pathnames.map((name, index) => {
          routeTo += `/${name}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography variant='caption' key={name}>
              {CrumbsMap[name]}
            </Typography>
          ) : (
            <ChipLink key={name} to={routeTo}>
              {CrumbsMap[name]}
            </ChipLink>
          );
        })}
      </MUIBreadcrumbs>
    </Container>
  );
};

const ChipLink = styled(Link)(({ theme }) => ({
  ...theme.typography.caption,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  padding: '0.1rem 0.5rem',
  borderRadius: '1.5rem',
}));
