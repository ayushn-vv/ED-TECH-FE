/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PATHS from '../../routes/paths';
import Course from './course/index';
import Instructor from './instructor/index';
// --------- Custom Arrow Icon (Replaces NavigateNextIcon) ---------
const ArrowSeparator = (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ margin: '0 4px' }}>
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// --------- Tab Panel ---------
interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return <div hidden={value !== index}>{value === index && <Box p={2}>{children}</Box>}</div>;
}

// --------- Main Component ---------
const LeadManage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Paper elevation={2} sx={{ width: '100%', borderRadius: 2, p: 1 }}>
        {/* --------- Breadcrumbs --------- */}
        <Breadcrumbs separator={ArrowSeparator} aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Box
            component={RouterLink}
            to={PATHS.dashboard}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'grey.100',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                bgcolor: 'grey.200',
              },
            }}
          >
            Dashboard
          </Box>

          <Typography
            sx={{
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'grey.200',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Course Management
          </Typography>
          
        </Breadcrumbs>

        {/* --------- Tabs --------- */}
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="Courses for Students" />
          <Tab label="Upcoming Courses" />
        </Tabs>

        {/* --------- Tab Panels --------- */}
        <TabPanel value={tabIndex} index={0}>
          {/* <LeadSourcePage /> */}
          <Course />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Instructor />
        </TabPanel>
      </Paper>
    </>
  );
};

export default LeadManage;
