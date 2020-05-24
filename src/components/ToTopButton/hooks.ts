import * as React from 'react';

function getPosition() {
  const { scrollHeight, clientHeight, scrollTop } = window.document.documentElement;

  const overflowY = scrollHeight - clientHeight;

  if (!overflowY) {
    return 0;
  }

  return scrollTop;
}

export function useScroll() {
  const [position, setPosition] = React.useState(0);

  const listener = () => setPosition(getPosition());

  React.useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  });

  return {
    position
  };
}

export const useScrollLock = () => {
  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.add('overflow-hidden');

    return () => document.body.classList.remove('overflow-hidden');
  });
};
