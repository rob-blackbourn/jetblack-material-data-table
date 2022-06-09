import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { Row, Column } from './types'

type DataTableBodyRowDetailCellProps<TContext> = {
  row: Row
  rows: Row[]
  columns: Column<TContext>[]
  context: any
  rowDetail: (
    row: Row,
    columns: Column<TContext>[],
    rows: Row[],
    context: any
  ) => React.ReactNode
  colSpan: number
}

export default function DataTableBodyRowDetailCell<TContext>({
  row,
  rows,
  columns,
  context,
  rowDetail,
  colSpan,
}: DataTableBodyRowDetailCellProps<TContext>) {
  return (
    <TableCell colSpan={colSpan}>
      {rowDetail(row, columns, rows, context)}
    </TableCell>
  )
}
