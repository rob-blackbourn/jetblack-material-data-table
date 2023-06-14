import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import DataTableHeadCheckbox from './DataTableHeadCheckbox'
import DataTableHeadCell from './DataTableHeadCell'

import { Column, ColumnSortMap, Row } from './types'

export interface DataTableHeadProps<TRow extends Row, TContext> {
  columns: Column<TRow, TContext>[]
  isSelectable: boolean
  numSelected: number
  rowCount: number
  onSelectAllClick: (isInvert: boolean, isChecked: boolean) => void
  columnSortMap: ColumnSortMap
  onSort: (column: Column<TRow, TContext>, isInvert: boolean) => void
  hasRowDetail: boolean
  disabled: boolean
  sx?: SxProps<Theme>
}

export default function DataTableHead<TRow extends Row, TContext>({
  columns,
  isSelectable,
  numSelected,
  rowCount,
  onSelectAllClick,
  columnSortMap,
  onSort,
  hasRowDetail,
  disabled,
}: DataTableHeadProps<TRow, TContext>) {
  return (
    <TableHead>
      <TableRow key="head">
        {hasRowDetail ? <TableCell key="head-row-detail" /> : null}
        {isSelectable ? (
          <DataTableHeadCheckbox
            key="head-checkbox"
            numSelected={numSelected}
            rowCount={rowCount}
            onSelectAllClick={onSelectAllClick}
            disabled={disabled}
          />
        ) : null}

        {columns
          .filter(column => !column.hide)
          .map((column, columnIndex) => (
            <DataTableHeadCell<TRow, TContext>
              key={`head-cell-${columnIndex}`}
              column={column}
              columnSortMap={columnSortMap}
              onSort={onSort}
            />
          ))}
      </TableRow>
    </TableHead>
  )
}
