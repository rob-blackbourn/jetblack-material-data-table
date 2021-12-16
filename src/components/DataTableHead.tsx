import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import DataTableHeadCheckbox from './DataTableHeadCheckbox'
import DataTableHeadCell from './DataTableHeadCell'

import { Column, ColumnSortMap } from './types'

type DataTableHeadProps = {
  columns: Column[]
  isSelectable: boolean
  numSelected: number
  rowCount: number
  onSelectAllClick: (isInvert: boolean, isChecked: boolean) => void
  columnSortMap: ColumnSortMap
  onSort: (column: Column, isInvert: boolean) => void
  hasRowDetail: boolean
  disabled: boolean
  sx?: SxProps<Theme>
}

const DataTableHead = ({
  columns,
  isSelectable,
  numSelected,
  rowCount,
  onSelectAllClick,
  columnSortMap,
  onSort,
  hasRowDetail,
  disabled
}: DataTableHeadProps) => (
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

      {columns.map((column, columnIndex) => (
        <DataTableHeadCell
          key={`head-cell-${columnIndex}`}
          column={column}
          columnSortMap={columnSortMap}
          onSort={onSort}
        />
      ))}
    </TableRow>
  </TableHead>
)

export default DataTableHead
