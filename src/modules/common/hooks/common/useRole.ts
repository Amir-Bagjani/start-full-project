import { useCallback, useMemo } from 'react';

//utils
import { ROLESMap } from 'utils/constants';
import { useUser } from 'modules/common/hooks';

//types
import { RolesType } from 'models';

export const useRole = () => {
  const { user } = useUser();

  const includedRole = useCallback(
    (roles: RolesType[] = []) => {
      return roles.includes(user?.role as RolesType);
    },
    [user?.role],
  );

  return useMemo(
    () => ({
      includedRole,
      role: user?.role,
      isAdmin: user?.role === ROLESMap.admin,
      isEditor: user?.role === ROLESMap.editor,
      isReceiptionict: user?.role === ROLESMap.receiptionict,
      isInsurer: user?.role === ROLESMap.insurer,
      isInsured: user?.role === ROLESMap.insured,
      isCounter: user?.role === ROLESMap.counter,
      isAdjuster: user?.role === ROLESMap.adjuster,
      isSuperadjuster: user?.role === ROLESMap.superadjuster,
      isLossadjuster: user?.role === ROLESMap.lossadjuster,
      isTrusteddoctor: user?.role === ROLESMap.trusteddoctor,
      isRegistrar: user?.role === ROLESMap.registrar,
      isReporter: user?.role === ROLESMap.reporter,
    }),
    [includedRole, user?.role],
  );
};
