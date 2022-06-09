import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column } from './types'

type DataTableBodyCellProps<TRow, TContext> = {
  row: Row<TRow>
  rows: Row<TRow>[]
  column: Column<TRow, TContext>
  columns: Column<TRow, TContext>[]
  context: TContext
}

export default function DataTableBodyCell<TRow, TContext>({
  row,
  rows,
  column,
  columns,
  context,
}: DataTableBodyCellProps<TRow, TContext>) {
  return (
    <TableCell align={column.align} sx={column.sx}>
      {getRenderedValue(row, column, columns, rows, context)}
    </TableCell>
  )
}
