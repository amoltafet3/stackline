import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

const SalesChart: React.FC = () => {
  const product = useSelector((state: RootState) => state.salesData.data[0]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const getUniqueMonthsData = (data: any[]) => {
    const uniqueMonthsMap = new Map(); 

    data.forEach((item) => {
      const month = dayjs(item.weekEnding).format('MMM-YYYY'); 
      if (!uniqueMonthsMap.has(month)) {
        uniqueMonthsMap.set(month, item);
      }
    });

    return Array.from(uniqueMonthsMap.values()); 
  };

  const uniqueMonthSalesData = getUniqueMonthsData(product.sales); 

  // Function to format date to display only the month
  const formatXAxis = (tickItem: string) => {
    return dayjs(tickItem).format('MMM'); 
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Retail Sales
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={uniqueMonthSalesData}>
            <XAxis 
              dataKey="weekEnding" 
              tickFormatter={formatXAxis} 
              interval={0} 
            />
            <YAxis domain={[0, 'auto']} tick={false} />
            <Tooltip />
            <Line type="monotone" dataKey="retailSales" stroke="blue" dot={false} />
            <Line type="monotone" dataKey="wholesaleSales" stroke="grey" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
