import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Column, Row } from '../components/types'
import { DataTable } from '../index'
import FilterTextField from './FilterTextField'
import { Props } from 'react'
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
  isSelectable: boolean
  filterText: string
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
        getValue: (row: Row, _column: Column) => row['band'],
      },
      {
        id: 'founded',
        title: 'Founded',
        disablePadding: false,
        align: 'right',
        formatValue: (value, row, _column) => `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
    isSelectable: false,
    filterText: '',
  }

  render() {
    const { classes } = this.props
    const { columns, rows, isSelectable, filterText } = this.state
    return (
      <div>
        <div>
          <FormControlLabel
            className={classes.selectableSlider}
            control={
              <Switch
                checked={isSelectable}
                onChange={(event) =>
                  this.setState({ isSelectable: event.target.checked })
                }
              />
            }
            label="Enable selection"
          />
        </div>
        <div>
          <FilterTextField
            className={classes.filterTextField}
            title="Filter"
            text={filterText}
            onChange={(filterText) => this.setState({ filterText })}
          />
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          isSelectable={isSelectable}
          filterText={filterText}
          rowDetail={(row, columns) => <div>This is about {row.band}</div>}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    )
  }
}

export default withStyles(styles)(App)
