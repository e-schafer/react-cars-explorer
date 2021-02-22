import { Chip, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React from 'react';
import iCarData from './iCarData';
//import CarData from './CarData';

function CarList(props: { carlist: Array<iCarData> }) {
  const [marque, setMarque] = React.useState('');
  const [modele, setModele] = React.useState('');
  const [carburant, setCarburant] = React.useState('');
  const [normeeuro, setNormeeuro] = React.useState('');

  const [carFilters,] = React.useState(new Map<string, (x: iCarData) => boolean>());

  const carToDisplay = () => {
    let cars =[...carFilters.values()].reduce((acc, c) => acc.filter(c), props.carlist); 
    return cars;
  }

  const handleChangeMarque = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMarque(event.target.value as string);
    event.target.value !== '' ? carFilters.set('marque', (x: iCarData) => x.LIBMRQ === event.target.value) : carFilters.delete('marque')
  };

  const handleChangeModele = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModele(event.target.value as string);
    event.target.value !== '' ? carFilters.set('modele', (x: iCarData) => x.TYPCOM === event.target.value) : carFilters.delete('modele')
  };

  const handleChangeCarburant = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCarburant(event.target.value as string);
    event.target.value !== '' ? carFilters.set('carburant', (x: iCarData) => x.LIBCRB === event.target.value) : carFilters.delete('carburant')
  };

  const handleChangeNormeeuro = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNormeeuro(event.target.value as string);
    event.target.value !== '' ? carFilters.set('euronorme', (x: iCarData) => x.EUNORM === event.target.value) : carFilters.delete('euronorme')
  };

  return (
    <>
      <FormControl fullWidth variant='filled'>
        <InputLabel id="marque-select-label">Marque</InputLabel>
        <Select
          labelId="marque-select-label"
          id="marque-simple-select"
          value={marque}
          onChange={handleChangeMarque}
        >
          {
            [...new Set(props.carlist.map((value: iCarData) => value.LIBMRQ))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
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
            [...new Set(carToDisplay().map((value: iCarData) => value.TYPCOM))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
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
            [...new Set(carToDisplay().map((value: iCarData) => value.LIBCRB))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl fullWidth variant='filled'>
        <InputLabel id="euronorme-select-label">Norme Euro</InputLabel>
        <Select
          labelId="euronorme-select-label"
          id="euronorme-simple-select"
          value={normeeuro}
          onChange={handleChangeNormeeuro}
        >
          {
            [...new Set(carToDisplay().map((value: iCarData) => value.EUNORM))].concat('').sort().map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
          }
        </Select>
      </FormControl>
      {carToDisplay().map((value) =>
        <Paper elevation={3} className='cardata'>
          <Typography variant='h6'>
            {value.LIBMRQ} {value.TYPCOM}
          </Typography>
          {value.LIBCRB ? <Chip label={value.LIBCRB} size='small' color='primary' /> : null}
          {value.EUNORM ? <Chip label={value.EUNORM} size='small' color='secondary' /> : null}
        </Paper>
      )};
    </>
  );
}

export default CarList