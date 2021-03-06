import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Carousel from "react-material-ui-carousel"
import { Divider, Grid, Hidden, makeStyles } from "@material-ui/core"
import React from "react"
import { Selector } from "../core/components/Selector"
import { ItemList } from "../core/components/ItemList"

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: -1,
  },
  carouselContainer: {
    marginTop: "60px",
    marginBottom: "60px",
  },
  item: {
    position: "relative",
    height: "350px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer",
    borderLeft: "1px solid #fafafa",
    borderRight: "1px solid #fafafa",
    "&:hover": {
      opacity: "0.5",
      transitionDuration: "0.2s",
    },
    "& h2": {
      width: "100%",
      position: "absolute",
      bottom: "0px",
      textAlign: "center",
      color: "white",
      backgroundColor: "black",
      opacity: "0.6",
      padding: "8px 0 8px",
      margin: "0",
    },
  },
  selectorBlock: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
  },
}))

const Home: BlitzPage = () => {
  const classes = useStyles()
  let items = [
    [
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
    ],
    [
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
    ],
    [
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
      { url: "/sample.jpg", text: "樂器文具" },
    ],
  ]
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.carouselContainer}
      >
        <Grid xs={12} sm={10}>
          <Carousel interval={8000} indicators={false}>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.selectorBlock} xs={12}>
          <Selector />
        </Grid>
        <Grid item className={classes.selectorBlock} xs={12} sm={10}>
          <ItemList />
        </Grid>
      </Grid>
    </div>
  )
}

function Item(props) {
  const classes = useStyles()
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className={classes.item}
        style={{ backgroundImage: `url(${props.item[0].url})` }}
      >
        <h2>{props.item[0].text}</h2>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className={classes.item}
        style={{ backgroundImage: `url(${props.item[1].url})` }}
      >
        <h2>{props.item[1].text}</h2>
      </Grid>
      <Hidden only={["sm"]}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          className={classes.item}
          style={{ backgroundImage: `url(${props.item[2].url})` }}
        >
          <h2>{props.item[2].text}</h2>
        </Grid>
      </Hidden>
    </Grid>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
