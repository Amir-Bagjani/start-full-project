import { Stack, Typography } from '@mui/material';
import { Children, useEffect, useMemo, useState } from 'react';

//components
import { BsCalendar3 } from 'react-icons/bs';

export const Calender = () => {
  // Save the current date to be able to trigger an update
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      // Return a funtion to clear the timer so that it will stop being called on unmount
      clearInterval(timer);
    };
  }, []);

  const fullDate = today.toLocaleDateString('fa-IR', {
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
  });

  const splitDate = useMemo(() => fullDate.replace(',', ' ').split(' '), [fullDate]);

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <BsCalendar3 />
      <Stack direction='row-reverse' spacing={0.4} alignItems='center'>
        {Children.toArray(splitDate.map((d) => <Typography variant='subtitle2'>{d}</Typography>))}
      </Stack>
    </Stack>
  );
};
