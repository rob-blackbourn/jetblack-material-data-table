import React from "react"
import { Theme, withStyles } from "@material-ui/core/styles"
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { Column, Row } from "../components/types"
import { DataTable } from "../index"
import { HTMLAttributes } from "react"

const styles = (theme: Theme) => ({
  selectableSlider: {
    margin: theme.spacing(1),
  },
  filterTextField: {
    width: 300,
  },
})

interface DataTableProps {}

interface DataTableState {
  columns: Column[]
  rows: Row[]
}

interface Classes {
  [key: string]: any
}

class App extends React.Component<
  HTMLAttributes<DataTableProps> & Classes,
  DataTableState
> {
  state: DataTableState = {
    columns: [
      {
        id: "name",
        title: "Name",
        align: "left",
      },
      {
        id: "band",
        title: "Band",
        align: "left",
        getValue: (row: Row, _column: Column) => row["band"],
      },
      {
        id: "founded",
        title: "Founded",
        align: "right",
        formatValue: (value, row, _column) => `${row.band} founded in ${value}`,
      },
      {
        id: "living",
        title:"Alive",
        align: "left",
        renderValue: (value, row, _column) => (value ? <CheckIcon /> : <ClearIcon />),
      }
    ],
    rows: [
      { name: "Jimmy Page", band: "Led Zeppelin", founded: 1968, living: true },
      { name: "Marc Bolan", band: "T. Rex", founded: 1967, living: false },
    ],
  }

  render() {
    const { classes } = this.props
    const { columns, rows } = this.state
    return (
      <div>
        <DataTable columns={columns} rows={rows} />
      </div>
    )
  }
}

export default withStyles(styles)(App)
