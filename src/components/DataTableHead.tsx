import * as React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
