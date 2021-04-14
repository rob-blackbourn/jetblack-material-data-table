import React from 'react'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { ColumnMap, Row } from '../components/types'
import DataTable from '../components/DataTable'

interface DataTableProps {}

interface DataTableState {
  columns: ColumnMap
  rows: Row[]
}

interface Classes {
  [key: string]: any
}

const RenderDataTable = () => {
  const columns: ColumnMap = {
    name: {
      order: 0,
      title: 'Name',
      align: 'left',
    },
    band: {
      order: 1,
      title: 'Band',
      align: 'left',
      getValue: (row, _column, _columns) => row['band'],
    },
    founded: {
      order: 2,
      title: 'Founded',
      align: 'right',
      formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
    },
    living: {
      order: 3,
      title: 'Alive',
      align: 'left',
      renderValue: (value, _row, _column, _columns) =>
        value ? <CheckIcon /> : <ClearIcon />,
    },
  }
  const rows: Row[] = [
    { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968, living: true },
    { name: 'Marc Bolan', band: 'T. Rex', founded: 1967, living: false },
  ]

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
    </div>
  )
}

export default RenderDataTable
