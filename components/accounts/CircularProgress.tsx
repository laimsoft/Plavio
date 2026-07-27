import { useMemo } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../constants/colors';

export function CircularProgress({
  percent,
  size,
  strokeWidth,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
}) {
  const { radius, circumference, strokeDashoffset } = useMemo(() => {
    const r = (size - strokeWidth) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (percent / 100) * c;
    return { radius: r, circumference: c, strokeDashoffset: offset };
  }, [percent, size, strokeWidth]);

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.surfaceContainer}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={colors.primary}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        rotation={-90}
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}
