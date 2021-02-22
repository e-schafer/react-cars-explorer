import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import {DriveEta} from '@material-ui/icons'

function Welcome() {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            >
            <Typography variant='h1'>
                Welcome
        </Typography>
        <DriveEta fontSize='large'/>
        </Grid>
    )
}
export default Welcome;