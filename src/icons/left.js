import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const SvgComponent = (props) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z"
        fill="#000"
        fillOpacity={0.6}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={24} height={24} rx={11} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
