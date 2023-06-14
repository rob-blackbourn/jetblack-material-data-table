import * as React from 'react'

import { Column } from '../components/types'
import { DataTable } from '../index'

interface RockStar {
  name: string
  band: string
  founded: number
}

const RowDetailDataTable = () => {
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
    { name: 'Eric Clapton', band: 'Cream', founded: 1966 },
    { name: 'John Mayall', band: 'Bluesbreakers', founded: 1963 },
    { name: 'Steve Harris', band: 'Iron Maiden', founded: 1975 },
    { name: 'Tony Iommi', band: 'Iron Maiden', founded: 1968 },
    { name: 'Robert Smith', band: 'The Cure', founded: 1978 },
  ]

  return (
    <div>
      <DataTable<RockStar>
        columns={columns}
        rows={rows}
        rowDetail={row => <div>This is about {row.band}</div>}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  )
}

export default RowDetailDataTable
