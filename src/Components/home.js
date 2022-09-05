import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import Navbar from './Navbar'

const home = () => {
  return (
    <Grid container rowSpacing={1} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} mb={10}>
        <Navbar />
      </Grid>
			<Grid item xs={9}>
        <Card>
          <CardContent>
            <Typography>
              Veniam cupidatat ullamco duis nulla adipisicing quis excepteur commodo. Esse velit occaecat ut deserunt aliquip velit labore deserunt. Ad consequat excepteur eu adipisicing dolor aliqua cupidatat dolor anim deserunt. Labore mollit qui quis fugiat aliqua cupidatat proident. Esse minim mollit occaecat sit laboris sit est dolor proident consectetur exercitation tempor.
            </Typography>
          </CardContent>
        </Card>
			</Grid>
		</Grid>
  )
}

export default home
