import * as React from 'react'

import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { stableSort, isRowSelected } from './utils'
import DataTableBodyRow from './DataTableBodyRow'

import { Row, Column, ColumnSortMap } from './types'

type DataTableBodyProps<TRow, TContext> = {
  rows: Row<TRow>[]
  columns: Column<TRow, TContext>[]
  selected: Row<TRow>[]
  columnSortMap: ColumnSortMap
  paginate: boolean
  page: number
  rowsPerPage: number
  colSpan: number
  isSelectable: boolean
  onSelected: (row: Row<TRow>) => void
  emptyRows: number
  rowDetail?: (
    row: Row<TRow>,
    columns: Column<TRow, TContext>[]
  ) => React.ReactNode
  compareRow?: (lhs: Row<TRow>, rhs: Row<TRow>) => boolean
  disabled: boolean
  context: TContext | null
}

export default function DataTableBody<TRow, TContext>({
  rows,
  columns,
  selected,
  columnSortMap,
  paginate,
  page,
  rowsPerPage,
  colSpan,
  isSelectable,
  onSelected,
  emptyRows,
  rowDetail,
  compareRow,
  disabled,
  context,
}: DataTableBodyProps<TRow, TContext>) {
  return (
    <TableBody>
      {stableSort(rows, columns, columnSortMap, context)
        .slice(
          paginate ? page * rowsPerPage : 0,
          paginate ? page * rowsPerPage + rowsPerPage : rows.length
        )
        .map((row, rowIndex) => (
          <DataTableBodyRow<TRow, TContext>
            key={`body-${rowIndex}`}
            row={row}
            rows={rows}
            columns={columns}
            isSelected={
              isSelectable && isRowSelected(row, selected, compareRow)
            }
            isSelectable={isSelectable}
            onSelected={onSelected}
            rowIndex={rowIndex}
            rowDetail={rowDetail}
            colSpan={colSpan}
            disabled={disabled}
            context={context}
          />
        ))}
      {emptyRows > 0 && (
        <TableRow key="body-empty" style={{ height: 48 * emptyRows }}>
          <TableCell colSpan={colSpan} />
        </TableRow>
      )}
    </TableBody>
  )
}
