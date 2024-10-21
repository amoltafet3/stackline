import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

const ProductDetails: React.FC = () => {
  const product = useSelector((state: RootState) => state.salesData.data[0]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', height: '100%', width: '100%' }}
        />
      </Box>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.subtitle}
        </Typography>

        <Box mt={2} mb={2}>
          <hr style={{ color: 'grey', backgroundColor: 'grey', height: 0.05 }} />
        </Box>

        <Box mt={2}>
          {product.tags.map((tag, index) => (
            <Button key={index} variant="outlined" color="primary" 
            style={{ 
                marginRight: '4px',
                marginBottom: '4px',
                borderColor: 'grey',
                color: 'grey'
                 
            }}>
              <Typography variant="caption">{tag}</Typography>
            </Button>
          ))}
        </Box>

        <Box mt={2} mb={2}>
          <hr style={{ color: 'grey', backgroundColor: 'grey', height: 0.05 }} />
        </Box>

      </CardContent>
    </Box>
  );
};

export default ProductDetails;
