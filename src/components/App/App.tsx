import { AppBar, CssBaseline, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import data from '../../data/snca_data.json';
import { CarList } from '../Car/Car';


function App() {
  const [marque, setMarque] = React.useState('');
  const [modele, setModele] = React.useState('');
  const [carburant, setCarburant] = React.useState('');

  const [voituresToDisplay, setVoituresToDisplay] = React.useState(data)

  const marquesList: Array<string> = [...new Set(data.map(value => value.LIBMRQ))].concat('')

  const handleChangeMarque = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMarque(event.target.value as string);
    event.target.value === '' ? setVoituresToDisplay(data) : setVoituresToDisplay(data.filter((value) => value.LIBMRQ === event.target.value));
  };

  const handleChangeModele = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModele(event.target.value as string);
    event.target.value === '' ? setVoituresToDisplay(data.filter((value) => value.LIBMRQ === marque)) : setVoituresToDisplay(voituresToDisplay.filter((value) => value.TYPCOM === event.target.value));
  };

  const handleChangeCarburant = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCarburant(event.target.value as string);
    event.target.value === '' ? setVoituresToDisplay(data) : setVoituresToDisplay(voituresToDisplay.filter((value) => value.LIBCRB === event.target.value));
  };

  return (
    <div className='App' >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title" component="div">
            Recherche véhicule
            </Typography>
        </Toolbar>

      </AppBar>
      <FormControl fullWidth variant='filled'>
        <InputLabel id="marque-select-label">Marque</InputLabel>
        <Select
          labelId="marque-select-label"
          id="marque-simple-select"
          value={marque}
          onChange={handleChangeMarque}
        >
          {
            marquesList.sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl fullWidth variant='filled'>
        <InputLabel id="modele-select-label">Modele</InputLabel>
        <Select
          labelId="modele-select-label"
          id="modele-simple-select"
          value={modele}
          onChange={handleChangeModele}
        >
          {
            [...new Set(voituresToDisplay.map((value) => value.TYPCOM))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl fullWidth variant='filled'>
        <InputLabel id="carburant-select-label">Carburant</InputLabel>
        <Select
          labelId="carburant-select-label"
          id="carburant-simple-select"
          value={carburant}
          onChange={handleChangeCarburant}
        >
          {
            [...new Set(voituresToDisplay.map((value) => value.LIBCRB))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
          }
        </Select>
      </FormControl>
      <CarList carlist={voituresToDisplay} />
    </div>
  );

}


export default App;
