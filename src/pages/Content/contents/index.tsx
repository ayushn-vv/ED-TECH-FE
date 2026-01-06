import { Box } from '@mui/material';
import { useState } from 'react';
import TableDesign from './tables';

const FollowUp = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TableDesign searchText={searchText} handleInputChange={handleInputChange} status={''} dateRange={''} />
    </Box>
  );
};

export default FollowUp;
