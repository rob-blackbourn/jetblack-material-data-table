import * as React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import DataTableHeadCheckbox from './DataTableHeadCheckbox'
import DataTableHeadCell from './DataTableHeadCell'

import { Column, ColumnMap, ColumnSortMap } from './types'

type DataTableHeadProps = {
  columns: ColumnMap
  isSelectable: boolean
  numSelected: number
  rowCount: number
  onSelectAllClick: (isInvert: boolean, isChecked: boolean) => void
  columnSortMap: ColumnSortMap
  onSort: (id: string, isInvert: boolean) => void
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

      {Object.entries(columns)
        .sort((
          [_lhsId, {order:lhsOrder}],
          [_rhsId, {order: rhsOrder}]) =>
          lhsOrder - rhsOrder)
        .map(([id, column]) => (
        <DataTableHeadCell
          key={`head-cell-${id}`}
          id={id}
          column={column}
          columnSortMap={columnSortMap}
          onSort={onSort}
        />
      ))}
    </TableRow>
  </TableHead>
)

export default DataTableHead
