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

## Usage

The `DataTable` has the following props:

### `rows`

The `rows` prop is a list of objects where each object is a now in the
table.

### `columns`

The `columns` prop is a list of `Column` objects with the following properties:

#### `id`

This is **required**. It is a unique identifier for the column, an if 
no accessor is supplied for the it is used as the key for the row.

#### `title`

This is an optional string which will be used as the title of the 
column.

#### `align`

This is the optional column alignment which is passed straight
through to
[`TableCell`](https://material-ui.com/api/table-cell/#props).

#### `getValue`

This is an optional function to get the column value in its native
form (it doesn't need to be formatted to a string). It has the 
following prototype:

```typescript
(row: Row, column: Column) => any
```

If this function is not specified it defaults to:

```typescript
function (row: Row, col: Column): any {
  return row[column.id]
}
```

#### `formatValue`

This is an optional function which takes the row value and formats it
to a string. it has the following prototype:

```typescript
(value: any, row: Row, column: Column) => string
```

If this function is not specified a simple string conversion is 
applied.

The formatted value is used for rendering if a `renderValue` function
is not defined, an for searching.

#### `renderValue`

This is an optional function which takes the row value and returns 
either a string or a react component. It has the following prototype.

```typescript
(value: any, row: Row, column: Column) => React.ReactNode | string
```

If this function is not specified the formatted value is used.

#### `search`

This is an optional function which takes the search text and returns
`true` if the text matches the column value. It has the following
prototype.

```typescript
(searchText: string, row: Row, column: Column) => boolean
```

If the function is not specified the formatted value is used for 
comparison.

### `compare`

This is an optional function which is used for sorting. It has the
following prototype:

```typescript
(lhs: Row, rhs: Row, column: Column) => -1 | 0 | 1
```

If the function is not specified the column values are used in the
comparison.

### `initialSelected`

This is an optional list of rows which are initially selected. It
defaults to an empty list.

### `isSelectable`

This is an optional boolean specifying whether the selection checkboxes
should be displayed. It defaults to `false`.

### `onSelectionChanged`

This is an optional callback function which takes the list of selected
rows.

### `filterText`

This is an optional string which is used to filter the rows in the 
table.

### `paginate`

This is an optional boolean which controls whether the table provides
pagination. It defaults to `true`.

### `rowsPerPage`

The number of rows shown in a page. This defaults to 10.

### `rowsPerPageOptions`

An optional list of the number of rows that can be shown on a page.

### `rowDetail`

An optional property which provides a row detail page. It has the
following prototype:

```typescript
(row: Row, columns: Column[]) => React.ReactNode
```

### `size`

An optional property specifying the size of the page.

### `padding`

An optional property controlling the table padding.

### `stickyHeader`

An optional property controlling the header position.
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
