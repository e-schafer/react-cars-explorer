import { Button, CssBaseline, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { ReactNode } from 'react';
import CarCharts from '../Car/CarCharts';
import CarList from '../Car/CarList';
import iCarData from '../Car/iCarData';
import Welcome from './Welcome';




function App() {
  const carDataList: Array<iCarData> = require('../../data/snca_data.json')
  const searchView = <CarList carlist={carDataList} />
  const statsview = <CarCharts carlist={carDataList} />

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentView, setCurrentView] = React.useState<ReactNode>(<Welcome/>)



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleClickItemRecherche = (event:React.MouseEvent<HTMLElement,MouseEvent>) => {
   setCurrentView(searchView);
   setAnchorEl(null);
 };

 const handleClickItemStats = (event:React.MouseEvent<HTMLElement,MouseEvent>) => {
  setCurrentView(statsview);
  setAnchorEl(null);
};

  return (
    <div className='App' >
      <CssBaseline />
      <Toolbar>
        <Button onClick={handleClick} startIcon={<MenuIcon />}>
          <Typography>Menu</Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickItemRecherche}>Recherche</MenuItem>
          <MenuItem onClick={handleClickItemStats}>Stats</MenuItem>
        </Menu>
      </Toolbar>

      {currentView}

    </div >
  );

}


export default App;
