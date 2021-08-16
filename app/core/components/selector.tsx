import {
  Button,
  Chip,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core"
import React, { useState } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      maxWidth: "200px",
      minWidth: "100px",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

export function Selector() {
  const classes = useStyles()
  const [personName, setPersonName] = useState<string[]>([])
  const handleChange = (event) => {
    setPersonName(event.target.value as string[])
  }
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Name</InputLabel>
          <Select
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (selected as string[]).join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField id="standard-basic" label="Standard" />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button variant="outlined" color="primary">
            搜尋
          </Button>
        </FormControl>
      </Grid>
    </>
  )
}
