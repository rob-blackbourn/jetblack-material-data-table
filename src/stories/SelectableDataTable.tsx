import * as React from 'react'

import { Column, Row } from '../components/types'
import { DataTable } from '../index'

interface SelectableDataTableProps {}

interface SelectableDataTableState {
  columns: Column[]
  rows: Row[]
  selected: Row[]
}

class SelectableDataTable extends React.Component<
  SelectableDataTableProps,
  SelectableDataTableState
> {
  state: SelectableDataTableState = {
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
        formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
      { name: 'Eric Clapton', band: 'Cream', founded: 1966 },
      { name: 'John Mayall', band: 'Bluesbreakers', founded: 1963 },
    ],
    selected: []
  }

  render() {
    const { columns, rows, selected } = this.state
    return (
      <DataTable
        columns={columns}
        rows={rows}
        selected={selected}
        onSelectionChanged={selected => this.setState({ selected })}
        isSelectable={true}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10]}
      />
    )
  }
}

export default SelectableDataTable
