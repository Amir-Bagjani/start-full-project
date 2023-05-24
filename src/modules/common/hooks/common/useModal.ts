import { useCallback, useMemo, useState } from 'react';

export const useModal = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const onOpen = useCallback(() => setOpen(true), []);

  const onClose = useCallback(() => setOpen(false), []);

  const onToggle = useCallback(() => setOpen((p) => !p), []);

  return useMemo(
    () => ({
      isOpen: open,
      onOpen,
      onClose,
      onToggle,
    }),
    [onClose, onOpen, onToggle, open],
  );
};
