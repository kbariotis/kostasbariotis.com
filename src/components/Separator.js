import React from 'react';
import { css } from 'glamor';

const style = css({
  height: '2px',
  width: '100%',
  marginBottom: '0.5em',
  marginTop: '0.5em',
  display: 'block',
  background:
    'linear-gradient(to right, #e52f45 0%, #e52f45 25%, #b42b3e 25%, #b42b3e 50%, #8ab2ff 50%, #8ab2ff 75%, #4d71b7 75%, #4d71b7 100%)',
});

const Separator = () => <div className={style} />;

export default Separator;
