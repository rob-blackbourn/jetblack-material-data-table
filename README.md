# @jetblack/material-data-table

A data table for material-ui

## Examples

### Simple

Here is a simple example:

```js
import React from "react"
import { Column, Row } from "../components/types"
import { DataTable } from "../index"

const RenderDataTable = () => {
    const columns: Column[] = [
      {
        id: "name",
        title: "Name",
        align: "left",
      },
      {
        id: "band",
        title: "Band",
        align: "left",
        getValue: (row: Row, _column: Column) => row["band"],
      },
      {
        id: "founded",
        title: "Founded",
        align: "right",
        formatValue: (value, row, _column) => `${row.band} founded in ${value}`,
      }
    ]
    const rows: Row[] = [
      { name: "Jimmy Page", band: "Led Zeppelin", founded: 1968 },
      { name: "Marc Bolan", band: "T. Rex", founded: 1967 },
    ]

    return (
      <div>
        <DataTable columns={columns} rows={rows} />
      </div>
    )
}

export default RenderDataTable
```

### Row Details

This example has row details:

```js
import React from 'react'
import { Column, Row } from '../components/types'
import { DataTable } from '../index'

const RowDetailDataTable = () => {
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
  ]
  const rows: Row[] = [
    { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
    { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        rows={rows}
        rowDetail={(row, columns) => <div>This is about {row.band}</div>}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  )
}

export default RowDetailDataTable
```
