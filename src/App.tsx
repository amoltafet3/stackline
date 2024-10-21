import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSalesData } from './features/salesDataSlice';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import SalesChart from './components/SalesChart';
import SalesTable from './components/SalesTable';
import Reviews from './components/Reviews';
import data from './stackline_frontend_assessment_data_2021.json';
import { Grid2 as Grid } from '@mui/material'; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: 10
}));

const ProductItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%', 
  display: 'flex', 
  flexDirection: 'column',
}));

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSalesData(data));
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEEEE'}}>
    <Header />

    <Grid container spacing={2} sx={{marginTop: 5,  marginRight: 3, marginLeft: 3}}>
      <Grid size={4}>
        <ProductItem>
          <ProductDetails />
        </ProductItem>
      </Grid>

      <Grid size={8}>
        <Item>
          <SalesChart />
        </Item>
        <Item>
          <SalesTable />
        </Item>
        <Item>
          <Reviews />
        </Item>
      </Grid>
    </Grid>
  </Box>

  );
};

export default App;

