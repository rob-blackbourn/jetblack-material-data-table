import * as React from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import { Column } from '../components/types'
import { DataTable } from '../index'
import FilterTextField from './FilterTextField'

interface RockStar {
  name: string
  band: string
  founded: number
}

interface ComplexDataTableProps {}

interface ComplexDataTableState {
  columns: Column<RockStar>[]
  rows: RockStar[]
  isSelectable: boolean
  filterText: string
  selected: RockStar[]
}

class ComplexDataTable extends React.Component<
  ComplexDataTableProps,
  ComplexDataTableState
> {
  state: ComplexDataTableState = {
    columns: [
      {
        id: 'name',
        title: 'Name',
        align: 'left',
      },
      {
        id: 'band',
        title: 'Band',
        align: 'left',
        getValue: (row, _column, _columns) => row['band'],
      },
      {
        id: 'founded',
        title: 'Founded',
        align: 'right',
        formatValue: (value, row, _column, _columns) =>
          `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
    isSelectable: false,
    filterText: '',
    selected: [],
  }

  render() {
    const { columns, rows, selected, isSelectable, filterText } = this.state

    return (
      <div>
        <div>
          <FormControlLabel
            sx={{ m: 1 }}
            control={
              <Switch
                checked={isSelectable}
                onChange={event =>
                  this.setState({ isSelectable: event.target.checked })
                }
              />
            }
            label="Enable selection"
          />
        </div>
        <div>
          <FilterTextField
            sx={{ width: 300 }}
            title="Filter"
            text={filterText}
            onChange={filterText => this.setState({ filterText })}
          />
        </div>

        <DataTable<RockStar>
          size="small"
          padding="none"
          columns={columns}
          rows={rows}
          selected={selected}
          onSelectionChanged={selected => this.setState({ selected })}
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

export default ComplexDataTable
