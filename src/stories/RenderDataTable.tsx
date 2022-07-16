import * as React from 'react'

import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { Column } from '../components/types'
import DataTable from '../components/DataTable'

interface RockStar {
  name: string
  band: string
  founded: number
  living: boolean
}

const RenderDataTable = () => {
  const columns: Column<RockStar>[] = [
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
    {
      id: 'living',
      title: 'Alive',
      align: 'left',
      renderValue: (value, _row, _column, _columns) =>
        value ? <CheckIcon /> : <ClearIcon />,
    },
  ]
  const rows: RockStar[] = [
    { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968, living: true },
    { name: 'Marc Bolan', band: 'T. Rex', founded: 1967, living: false },
  ]

  return (
    <div>
      <DataTable<RockStar> columns={columns} rows={rows} />
    </div>
  )
}

export default RenderDataTable
