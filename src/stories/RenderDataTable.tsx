import React from 'react'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { Column, Row } from '../components/types'
import DataTable from '../components/DataTable'

interface DataTableProps {}

interface DataTableState {
  columns: Column[]
  rows: Row[]
}

interface Classes {
  [key: string]: any
}

const RenderDataTable = () => {
  const columns: Column[] = [
    {
      id: 'name',
      title: 'Name',
      align: 'left',
    },
    {
      id: 'band',
      title: 'Band',
      align: 'left',
      getValue: (row: Row, _column: Column) => row['band'],
    },
    {
      id: 'founded',
      title: 'Founded',
      align: 'right',
      formatValue: (value, row, _column) => `${row.band} founded in ${value}`,
    },
    {
      id: 'living',
      title: 'Alive',
      align: 'left',
      renderValue: (value, row, _column) =>
        value ? <CheckIcon /> : <ClearIcon />,
    },
  ]
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
