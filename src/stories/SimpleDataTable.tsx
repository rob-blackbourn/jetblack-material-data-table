import React from "react"
import { Theme, withStyles } from "@material-ui/core/styles"
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

interface RenderDataTableProps {}

interface RenderDataTableState {
  columns: Column[]
  rows: Row[]
}

interface Classes {
  [key: string]: any
}

class RenderDataTable extends React.Component<
  HTMLAttributes<RenderDataTableProps> & Classes,
  RenderDataTableState
> {
  state: RenderDataTableState = {
    columns: [
      {
        id: "name",
        title: "Name",
        disablePadding: false,
        align: "left",
      },
      {
        id: "band",
        title: "Band",
        disablePadding: false,
        align: "left",
        getValue: (row: Row, _column: Column) => row["band"],
      },
      {
        id: "founded",
        title: "Founded",
        disablePadding: false,
        align: "right",
        formatValue: (value, row, _column) => `${row.band} founded in ${value}`,
      }
    ],
    rows: [
      { name: "Jimmy Page", band: "Led Zeppelin", founded: 1968 },
      { name: "Marc Bolan", band: "T. Rex", founded: 1967 },
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

export default withStyles(styles)(RenderDataTable)
