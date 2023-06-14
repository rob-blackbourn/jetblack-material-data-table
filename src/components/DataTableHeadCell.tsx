import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'

import { Column, ColumnSortMap, Row } from './types'

export interface DataTableHeadCellProps<TRow extends Row, TContext> {
  column: Column<TRow, TContext>
  columnSortMap: ColumnSortMap
  onSort: (column: Column<TRow, TContext>, isInvert: boolean) => void
}

export default function DataTableHeadCell<TRow extends Row, TContext>({
  column,
  columnSortMap,
  onSort,
}: DataTableHeadCellProps<TRow, TContext>) {
  return (
    <TableCell
      align={column.align}
      sortDirection={columnSortMap[column.id] || false}
    >
      <Tooltip
        title="Sort"
        placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
        enterDelay={300}
      >
        <TableSortLabel
          active={column.id in columnSortMap}
          direction={columnSortMap[column.id] || 'asc'}
          onClick={event => onSort(column, event.nativeEvent.shiftKey)}
        >
          {column.title}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  )
}
