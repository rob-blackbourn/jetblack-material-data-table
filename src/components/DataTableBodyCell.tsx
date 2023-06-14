import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { getRenderedValue } from './utils'

import { Column, Row } from './types'

export interface DataTableBodyCellProps<TRow extends Row, TContext> {
  row: TRow
  rows: TRow[]
  column: Column<TRow, TContext>
  columns: Column<TRow, TContext>[]
  context: TContext
}

export default function DataTableBodyCell<TRow extends Row, TContext>({
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
