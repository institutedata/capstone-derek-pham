import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { FoodDataContext } from './FoodDataContext';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const { foodItems } = useContext(FoodDataContext);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of items sold',
        data: [],
        backgroundColor: [],
        borderColor: [],
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/newBarChartData');
        const newData = await response.json();

        // Define a set of colors for the bars
        const barColors = [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
        ];

        const backgroundColors = Object.values(newData).map((_, index) => barColors[index % barColors.length]);
        const borderColors = backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.2)'));

        setChartData({
          labels: Object.keys(newData),
          datasets: [
            {
              label: 'Number of items sold',
              data: Object.values(newData),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [foodItems]); 

  return <Bar data={chartData} options={options} id='myBarChart' />;
};

export default BarChart;
