import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import data from '../../data/snca_data.json';




const CarList = (props:{carlist:Array<any>}) => {
    return (
      <>
        {props.carlist.map((value) =>
          <Paper elevation={3} className='cardata'>
            <Typography variant='h6'>
              {value.LIBMRQ} {value.TYPCOM}
            </Typography>
            {value.hasOwnProperty("LIBCRB")  ? <Chip label={value.LIBCRB} size='small' color='primary' /> : null}
            {value.hasOwnProperty("EUNORM")  ? <Chip label={value.EUNORM} size='small' color='secondary' /> : null}
          </Paper>
        )};
      </>
    );
  }
  
  const CarTable = () => {
  
    return (
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Marque</TableCell>
              <TableCell align="left">Modele</TableCell>
              <TableCell align="left">Carburant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow className="hideLastBorder">
                <TableCell align="left">{row.LIBMRQ}</TableCell>
                <TableCell align="left">{row.TYPCOM}</TableCell>
                <TableCell align="left">{row.LIBCRB}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export {CarTable, CarList}