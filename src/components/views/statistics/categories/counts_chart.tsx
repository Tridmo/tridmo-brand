"use client"

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Box, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectMyProfile } from '../../../../data/me';
import { horizontalBarChartOptions } from '../../../../types/charts.config';
import { selectBrandCategories, selectBrandCategoriesStatus } from '../../../../data/categories';
import { colorsPalette } from '../../../../utils/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
const colors = colorsPalette;
const barsCount = 5;

export default function CategoriesCountsChartComponent() {

  const dispatch = useDispatch();
  const dataStatus = useSelector(selectBrandCategoriesStatus);
  const data = useSelector(selectBrandCategories)
  const profile = useSelector(selectMyProfile);

  const [chartData, setChartData] = useState<any[]>([]);


  useEffect(() => {
    if (data) {
      const dataArr = [...data];

      const firstFour = dataArr.slice(0, 4);
      const remaining = dataArr.slice(4); // Fix slice to include all remaining elements

      let arr: any[] = [];

      firstFour.forEach((el, i) => {
        if (el && el.downloads_count != 0)
          arr.push({ name: el?.name, count: el?.downloads_count, barColor: colors[i] });
      });

      if (remaining.length > 0) {
        const sumCount = remaining.reduce((a, c) => a + c.downloads_count, 0);
        arr.push({ name: 'Другие', count: sumCount, barColor: colors[4] });
      }

      const fakeDataCount = barsCount - arr.length;
      if (fakeDataCount > 0) {
        for (let i = 0; i < fakeDataCount; i++) {
          arr.push({ name: '', downloads_count: '' });
        }
      }

      // Check if chartData needs to be updated
      if (JSON.stringify(arr) !== JSON.stringify(chartData)) {
        setChartData(arr);
      }
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#fff',
        p: '24px',
        boxShadow: '0px 3px 4px 0px #00000014',
        borderRadius: '4px',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Загрузки по категории</h3>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {
          dataStatus === 'succeeded' && !!data ?
            (
              <Bar
                data={{
                  labels: chartData.map(e => e.name),
                  datasets: [
                    {
                      label: 'Загрузки',
                      data: chartData.map(e => e.count),
                      backgroundColor: chartData.map((_, index) => colors[index % colors.length]),
                      barThickness: 31,
                      borderColor: 'transparent',
                      borderRadius: 8,
                      borderSkipped: false,
                    },
                  ],
                }}
                options={{
                  ...horizontalBarChartOptions,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                        drawOnChartArea: false,
                      },
                      border: {
                        display: false,
                      },
                      ticks: {
                        display: false
                      }
                    },
                    y: {
                      grid: {
                        display: false,
                        drawTicks: false,
                        drawOnChartArea: false,
                      },
                      border: {
                        display: false,
                      },
                    },
                  },
                }}
                width={'100%'}
                height={'300px'}
              />
            )
            :
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={'300px'}
            />
        }
      </Box>
    </Box>
  );
};
