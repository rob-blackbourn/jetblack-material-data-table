import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column } from './types'

type DataTableBodyCellProps<TContext> = {
  row: Row
  rows: Row[]
  column: Column<TContext>
  columns: Column<TContext>[]
  context: TContext
}

export default function DataTableBodyCell<TContext>({
  row,
  rows,
  column,
  columns,
  context,
}: DataTableBodyCellProps<TContext>) {
  return (
    <TableCell align={column.align} sx={column.sx}>
      {getRenderedValue(row, column, columns, rows, context)}
    </TableCell>
  )
}
