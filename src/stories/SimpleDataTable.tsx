import * as React from 'react'

import { Column } from '../components/types'
import { DataTable } from '../index'

interface RockStar {
  name: string
  band: string
  founded: number
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
  ]
  const rows: RockStar[] = [
    { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
    { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
  ]

  return (
    <div>
      <DataTable<RockStar> columns={columns} rows={rows} />
    </div>
  )
}

export default RenderDataTable
