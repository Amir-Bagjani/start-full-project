import { APIs } from 'services/APIs';
import { useMutation } from '@tanstack/react-query';

export const usePostAgencyLocationAPI = (options = {}) => {
  return useMutation({
    mutationFn: (params) => APIs.expense.changeAgencyLocation(params),
    ...options,
  });
};
