import { APIs } from 'services/APIs';
import { useQuery } from '@tanstack/react-query';

export const TOOTH_NUMBERS = 'TOOTH_NUMBERS';

export const useToothNumbersAPI = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [TOOTH_NUMBERS],
    queryFn: () => APIs.expense.getToothNumbers(params),
    ...options,
  });
};
