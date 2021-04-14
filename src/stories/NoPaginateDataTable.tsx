import React from 'react'
import { ColumnMap, Row } from '../components/types'
import { DataTable } from '../index'

const NoPaginateDataTable = () => {
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
  }
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
