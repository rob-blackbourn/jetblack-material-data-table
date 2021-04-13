# @jetblack/material-data-table

A simple data table for [material-ui](https://material-ui.com).

## Status

This is work in progress.

## Features

* Optional custom get, format and render
* Optional search
* Optional sort
* Optional pagination
* Row details
* Selection

## Examples

### Simple

Here is a simple example:

```js
import React from "react"
import { DataTable } from '@jetblack/material-data-table'

const RenderDataTable = () => {
    const columns = [
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
    const rows = [
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
import { DataTable } from '@jetblack/material-data-table'

const RowDetailDataTable = () => {
  const columns = [
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
  const rows = [
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
