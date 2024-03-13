import React from 'react';
import { BRAND } from 'src/constants';
import { StyledWatermark } from './SearchComponent/StyledComponent';

const Watermark = () => {
  return (
    <StyledWatermark>
      <span>{'Powered by:'}</span> <a href="https://www.zeroshotbot.com">{BRAND}</a>
    </StyledWatermark>
  );
};

export default Watermark;
