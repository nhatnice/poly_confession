import React from 'react';
import Config from '@config';

import './styles.scss';

export const AppLabel = () => {
  return (
    <div className="app-label">
      <a href="https://www.lavenes.com/" target="_blank" className="app-label__label">
        {Config.APP_VERSION.NAME}
      </a>
    </div>
  );
};
