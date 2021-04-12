import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'
import { Column, Row } from '../components/types'
import { DataTable } from '../index'
import { HTMLAttributes } from 'react'

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
        id: 'name',
        title: 'Name',
        disablePadding: false,
        align: 'left',
      },
      {
        id: 'band',
        title: 'Band',
        disablePadding: false,
        align: 'left',
        getter: (row: Row, _column: Column) => row['band'],
      },
      {
        id: 'founded',
        title: 'Founded',
        disablePadding: false,
        align: 'right',
        formatter: (value, row, _column) => `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
  }

  render() {
    const { classes } = this.props
    const { columns, rows } = this.state
    return (
      <div>
        <DataTable columns={columns} rows={rows} paginate={false} />
      </div>
    )
  }
}

export default withStyles(styles)(App)
