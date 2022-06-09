import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { Row, Column } from './types'

type DataTableBodyRowDetailCellProps<TRow, TContext> = {
  row: Row<TRow>
  rows: Row<TRow>[]
  columns: Column<TRow, TContext>[]
  context: TContext | null
  rowDetail: (
    row: Row<TRow>,
    columns: Column<TRow, TContext>[],
    rows: Row<TRow>[],
    context: TContext | null
  ) => React.ReactNode
  colSpan: number
}

export default function DataTableBodyRowDetailCell<TRow, TContext>({
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
