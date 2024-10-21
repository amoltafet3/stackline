import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel } from '@mui/material';
import dayjs from 'dayjs';

type Order = 'asc' | 'desc';

const SalesTable: React.FC = () => {
  const product = useSelector((state: RootState) => state.salesData.data[0]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('weekEnding'); 

  if (!product) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MM-DD-YY');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const sortData = (array: any[], comparator: (a: any, b: any) => number) => {
    const stabilizedArray = array.map((el, index) => [el, index] as const);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1]; 
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const getComparator = (order: Order, orderBy: string) => {
    return order === 'desc'
      ? (a: any, b: any) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a: any, b: any) => (a[orderBy] < b[orderBy] ? -1 : 1);
  };

  const handleSortRequest = (column: string) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc'); 
    setOrderBy(column); 
  };

  const sortedSalesData = sortData(product.sales, getComparator(order, orderBy)); // Sorted data

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom style={{ padding: '16px' }}>
        Sales Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* Sortable headers with TableSortLabel */}
            <TableCell>
              <TableSortLabel
                active={orderBy === 'weekEnding'}
                direction={orderBy === 'weekEnding' ? order : 'asc'}
                onClick={() => handleSortRequest('weekEnding')}
              >
                Week Ending
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'retailSales'}
                direction={orderBy === 'retailSales' ? order : 'asc'}
                onClick={() => handleSortRequest('retailSales')}
              >
                Retail Sales
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'wholesaleSales'}
                direction={orderBy === 'wholesaleSales' ? order : 'asc'}
                onClick={() => handleSortRequest('wholesaleSales')}
              >
                Wholesale Sales
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'unitsSold'}
                direction={orderBy === 'unitsSold' ? order : 'asc'}
                onClick={() => handleSortRequest('unitsSold')}
              >
                Units Sold
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'retailerMargin'}
                direction={orderBy === 'retailerMargin' ? order : 'asc'}
                onClick={() => handleSortRequest('retailerMargin')}
              >
                Retailer Margin
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSalesData.map((sale, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(sale.weekEnding)}</TableCell>
              <TableCell>{formatCurrency(sale.retailSales)}</TableCell>
              <TableCell>{formatCurrency(sale.wholesaleSales)}</TableCell>
              <TableCell>{sale.unitsSold}</TableCell>
              <TableCell>{formatCurrency(sale.retailerMargin)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
