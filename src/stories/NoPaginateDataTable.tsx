import React from 'react'
import { Column, Row } from '../components/types'
import { DataTable } from '../index'

const NoPaginateDataTable = () => {
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
      getValue: (row, _column, _columns) => row['band'],
    },
    {
      id: 'founded',
      title: 'Founded',
      align: 'right',
      formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
    },
  ]
  const rows: Row[] = [
    { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
    { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
  ]

  return (
    <div>
      <DataTable columns={columns} rows={rows} paginate={false} />
    </div>
  )
}

export default NoPaginateDataTable
