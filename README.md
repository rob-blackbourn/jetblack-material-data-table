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

| Name                 | Type       | Default          | Description                                      |
| -------------------- | ---------- | ---------------- | ------------------------------------------------ |
| `columns`            | `array`    | *required*       | The columns                                      |
| `rows`               | `array`    | *required*       | The rows                                         |
| `selected`           | `array`    | `[]`             | The list of selected rows                        |
| `isSelectable`       | `boolean`  | `false`          | Whether the rows are selectable                  |
| `onSelectionChanged` | `function` | `null`           | A function to call when the selection is changed |
| `filterText`         | `string`   | `''`             | Text to filter the rows                          |
| `paginate`           | `boolean`  | `true`           | Whether to paginate the table                    |
| `rowsPerPage`        | `number`   | `10`             | The number of rows to display when paginating    |
| `rowsPerPageOptions` | `array`    | `[ 10, 20, 100]` | The choices of number of rows to display         |
| `rowDetail`          | `function` | `null`           | A row detail panel                               |
| `size`               | `string`   | `'medium'`       | The table size                                   |
| `padding`            | `string`   | `'default'`      | The table padding                                |
| `stickyHeader`       | `boolean`  | `false`          | Whether to use sticky headers                    |
| `className`          | `string`   | `null`           | The class name                                   |
| `style`              | `styles`   | `null`           | Th component styles                              |

### `DataTable.rows`

The `rows` prop is a list of objects where each object is a now in the
table.

### `DataTable.columns`

The `columns` prop is a list of `Column` objects with the following properties:

| Name          | Type       | Default    | Description                           |
| ------------- | ---------- | ---------- | ------------------------------------- |
| `id`          | `string`   | *required* | The column id                         |
| `title`       | `string`   | `null`     | The column title                      |
| `align`       | `string`   | `'left'`   | The column alignment                  |
| `getValue`    | `function` | `null`     | A custom function to select cell data |
| `formatValue` | `function` | `null`     | A custom function to format cell data |
| `renderValue` | `function` | `null`     | A custom function  to render a cell   |
| `search`      | `function` | `null`     | a custom function used by the filter  |
| `compare`     | `function` | `null`     | A custom function used when sorting   |

#### `Column.id`

This is **required**. It is a unique identifier for the column, an if 
no accessor is supplied for the it is used as the key for the row.

#### `Column.title`

This is an optional string which will be used as the title of the 
column.

#### `Column.align`

This is the optional column alignment which is passed straight
through to
[`TableCell`](https://material-ui.com/api/table-cell/#props).

#### `Column.getValue`

This is an optional function to get the column value in its native
form (it doesn't need to be formatted to a string). It has the 
following prototype:

```typescript
(row: Row, column: Column, columns: Column[]) => any
```

If this function is not specified it defaults to:

```typescript
function (row: Row, col: Column, columns: Column[]): any {
  return row[column.id]
}
```

#### `Column.formatValue`

This is an optional function which takes the row value and formats it
to a string. it has the following prototype:

```typescript
(value: any, row: Row, column: Column, columns: Column[]) => string
```

If this function is not specified a simple string conversion is 
applied.

The formatted value is used for rendering if a `renderValue` function
is not defined, an for searching.

#### `Column.renderValue`

This is an optional function which takes the row value and returns 
either a string or a react component. It has the following prototype.

```typescript
(value: any, row: Row, column: Column, columns: Column[]) => React.ReactNode | string
```

If this function is not specified the formatted value is used.

#### `Column.search`

This is an optional function which takes the search text and returns
`true` if the text matches the column value. It has the following
prototype.

```typescript
(searchText: string, row: Row, column: Column, columns: Column[]) => boolean
```

If the function is not specified the formatted value is used for 
comparison.

#### `Column.compare`

This is an optional function which is used for sorting. It has the
following prototype:

```typescript
(lhs: Row, rhs: Row, column: Column, columns: Column[]) => -1 | 0 | 1
```

If the function is not specified the column values are used in the
comparison.

### `DataTable.selected`

This is an optional list of rows which are selected. It
defaults to an empty list. If selection is required, this property
must be maintained by the state of the parent component.

### `DataTable.isSelectable`

This is an optional boolean specifying whether the selection checkboxes
should be displayed. It defaults to `false`.

### `DataTable.onSelectionChanged`

This is an optional callback function which takes the list of selected
rows.

### `DataTable.filterText`

This is an optional string which is used to filter the rows in the 
table.

### `DataTable.paginate`

This is an optional boolean which controls whether the table provides
pagination. It defaults to `true`.

### `DataTable.rowsPerPage`

The number of rows shown in a page. This defaults to 10.

### `DataTable.rowsPerPageOptions`

An optional list of the number of rows that can be shown on a page.

### `DataTable.rowDetail`

An optional property which provides a row detail page. It has the
following prototype:

```typescript
(row: Row, columns: Column[]) => React.ReactNode
```

### `DataTable.size`

An optional property specifying the size of the page.

### `DataTable.padding`

An optional property controlling the table padding.

### `DataTable.stickyHeader`

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
        getValue: (row, _column, _columns) => row["band"],
      },
      {
        id: "founded",
        title: "Founded",
        align: "right",
        formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
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
      getValue: (row, _column, _columns) => row['band'],
    },
    {
      id: 'founded',
      title: 'Founded',
      align: 'right',
      formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
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

### Selection

```javascript
import React from 'react'
import { DataTable } from '@jetblack/material-data-table'

class SelectableDataTable extends React.Component {
  state = {
    columns: [
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
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
    selected: []
  }

  render() {
    const { columns, rows, selected } = this.state
    return (
      <DataTable
        size='small'
        padding='none'
        columns={columns}
        rows={rows}
        selected={selected}
        onSelectionChanged={selected => this.setState({ selected })}
        isSelectable={true}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10]}
      />
    )
  }
}

export default SelectableDataTable
```
