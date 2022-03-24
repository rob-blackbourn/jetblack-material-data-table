import * as React from 'react'

import { Column, Row } from '../components/types'
import { DataTable } from '../index'

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
      getValue: (row, _column, _columns) => row['band'],
      sx: { color: 'red' },
    },
    {
      id: 'founded',
      title: 'Founded',
      align: 'right',
      formatValue: (value, row, _column, _columns) =>
        `${row.band} founded in ${value}`,
    },
    {
      id: 'source',
      title: 'Source',
    },
    {
      id: 'notes',
      title: 'Notes',
      sx: { maxWidth: '100px' },
    },
  ]

  const rows: Row[] = [
    {
      name: 'Jimmy Page',
      band: 'Led Zeppelin',
      founded: 1968,
      source: 'Wikipedia',
      notes:
        'This is a very very very very very very very very long note to demonstrate how a column width can be limited',
    },
    {
      name: 'Marc Bolan',
      band: 'T. Rex',
      founded: 1967,
      source: 'Album cover',
      notes: 'A small note',
    },
  ]

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
    </div>
  )
}

export default RenderDataTable
