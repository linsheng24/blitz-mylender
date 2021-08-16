import React from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles({
  card: {},
  media: {
    height: 140,
  },
})

export function ItemList() {
  const classes = useStyles()
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
    <Grid key={item} item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))
  return (
    <Grid container direction="row" alignItems="center" spacing={2}>
      {items}
    </Grid>
  )
}
