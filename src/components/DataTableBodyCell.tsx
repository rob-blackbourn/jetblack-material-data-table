import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column } from './types'

type DataTableBodyCellProps = {
  row: Row
  rows: Row[]
  column: Column
  columns: Column[]
  context: any
}

const DataTableBodyCell: React.FC<DataTableBodyCellProps> = ({
  row,
  rows,
  column,
  columns,
  context
}) => (
  <TableCell align={column.align}>
    {getRenderedValue(row, column, columns, rows, context)}
  </TableCell>
)

export default DataTableBodyCell
