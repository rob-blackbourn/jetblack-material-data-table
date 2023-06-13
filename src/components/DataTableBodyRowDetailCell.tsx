import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { Column, Row } from './types'

export interface DataTableBodyRowDetailCellProps<TRow extends Row, TContext> {
  row: TRow
  rows: TRow[]
  columns: Column<TRow, TContext>[]
  context: TContext
  rowDetail: (
    row: TRow,
    columns: Column<TRow, TContext>[],
    rows: TRow[],
    context: TContext
  ) => React.ReactNode
  colSpan: number
}

export default function DataTableBodyRowDetailCell<TRow extends Row, TContext>({
  row,
  rows,
  columns,
  context,
  rowDetail,
  colSpan,
}: DataTableBodyRowDetailCellProps<TRow, TContext>) {
  return (
    <TableCell colSpan={colSpan}>
      {rowDetail(row, columns, rows, context)}
    </TableCell>
  )
}
