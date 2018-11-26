import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';

const x = d => getPrettyMonth(d.month) + "/" + d.year;
const y = d => d.count;

const getPrettyMonth = (month) => {
  let displayMonth = month + 1;
  if(displayMonth < 10) {
    displayMonth = '0' + displayMonth;
  }
  return displayMonth;
};

export default ({ width, height, data }) => {
  const margin = {
    top: 20,
    bottom: 40,
    left: 60,
    right: 0,
  };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
    padding: 0.4
  });
  const axisColor = '#17e9d9';

  return (
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
              scale={xScale}
              top={yMax}
              label={'Month'}
              stroke={axisColor}
              tickStroke={axisColor}
              labelProps={{ textAnchor: 'middle', fontFamily: 'Arial', fontSize: 12, fill: axisColor }}
              tickLabelProps={(val, i) => (
                { dy: '0.25em', textAnchor: 'middle', fontFamily: 'Arial', fontSize: 11, fill: axisColor }
              )}
          />

          <AxisLeft
              scale={yScale}
              top={0}
              left={0}
              label={'Posts'}
              stroke={'#17e9d9'}
              tickStroke={'#17e9d9'}
              labelProps={{ textAnchor: 'middle', fontFamily: 'Arial', fontSize: 12, fill: axisColor }}
              tickLabelProps={(val, i) => (
                  { dx: '-0.25em', dy: '0.25em', textAnchor: 'end', fontFamily: 'Arial', fontSize: 11, fill: axisColor }
              )}
          />
          {data.map((value, i) => {
            const key = x(value);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - yScale(y(value));
            const barX = xScale(key);
            const barY = yMax - barHeight;
            return (
                <Bar
                    key={`bar-${key}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="rgba(23, 233, 217, .5)"
                />
            );
          })}
        </Group>
      </svg>
  );
};