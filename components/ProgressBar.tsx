import React from 'react';
import _ProgressBar from 'nextjs-progressbar';

function ProgressBar() {
  return (
    <_ProgressBar
      startPosition={0.15}
      stopDelayMs={200}
      height={2}
      showOnShallow={true}
      options={{ showSpinner: false }}
      transformCSS={(css) => {
        return (
          <style>
            {
              '#nprogress .bar { background: var(--focus-text); position: fixed; z-index: 9999; top: 0; left: 0; width: 100%; height: 3px; }'
            }
          </style>
        );
      }}
    />
  );
}

export default ProgressBar;
