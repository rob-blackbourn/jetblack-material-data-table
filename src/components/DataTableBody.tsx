import * as React from 'react'

import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { stableSort, isRowSelected } from './utils'
import DataTableBodyRow from './DataTableBodyRow'

import { Row, Column, ColumnSortMap } from './types'

type DataTableBodyProps<TContext> = {
  rows: Row[]
  columns: Column<TContext>[]
  selected: Row[]
  columnSortMap: ColumnSortMap
  paginate: boolean
  page: number
  rowsPerPage: number
  colSpan: number
  isSelectable: boolean
  onSelected: (row: Row) => void
  emptyRows: number
  rowDetail?: (row: Row, columns: Column<TContext>[]) => React.ReactNode
  compareRow?: (lhs: Row, rhs: Row) => boolean
  disabled: boolean
  context: any
}

export default function DataTableBody<TContext>({
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
}: DataTableBodyProps<TContext>) {
  return (
    <TableBody>
      {stableSort(rows, columns, columnSortMap, context)
        .slice(
          paginate ? page * rowsPerPage : 0,
          paginate ? page * rowsPerPage + rowsPerPage : rows.length
        )
        .map((row, rowIndex) => (
          <DataTableBodyRow
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
