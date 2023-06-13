import { useMemo, useState } from 'react';

export const useModal = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  return useMemo(
    () => ({
      isOpen: open,
      onOpen: () => setOpen(true),
      onClose: () => setOpen(false),
      onToggle: () => setOpen((p) => !p),
    }),
    [open],
  );
};
