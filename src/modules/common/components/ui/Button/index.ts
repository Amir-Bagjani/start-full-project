import { RootButton } from './RootButton';
import { LoadingButton } from './LoadingButton';

export * from './RootButton';
export * from './LoadingButton';

export const Button = Object.assign(RootButton, {
  Loading: LoadingButton,
});
