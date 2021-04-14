import * as React from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { stableSort, isRowSelected } from './utils'
import DataTableBodyRow from './DataTableBodyRow'

import { Row, Column, ColumnSortMap } from './types'

type DataTableBodyProps = {
  rows: Row[]
  columns: Column[]
  selected: Row[]
  columnSortMap: ColumnSortMap
  paginate: boolean
  page: number
  rowsPerPage: number
  colSpan: number
  isSelectable: boolean
  onSelected: (row: Row) => void
  emptyRows: number
  rowDetail?: (row: Row, columns: Column[]) => React.ReactNode
  compareRow?: (lhs: Row, rhs: Row) => boolean
}

const DataTableBody = ({
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
  compareRow
}: DataTableBodyProps) => (
  <TableBody>
    {stableSort(rows, columns, columnSortMap)
      .slice(
        paginate ? page * rowsPerPage : 0,
        paginate ? page * rowsPerPage + rowsPerPage : rows.length
      )
      .map((row, rowIndex) => (
        <DataTableBodyRow
          key={`body-${rowIndex}`}
          row={row}
          columns={columns}
          isSelected={isSelectable && isRowSelected(row, selected, compareRow)}
          isSelectable={isSelectable}
          onSelected={onSelected}
          rowIndex={rowIndex}
          rowDetail={rowDetail}
          colSpan={colSpan}
        />
      ))}
    {emptyRows > 0 && (
      <TableRow key="body-empty" style={{ height: 48 * emptyRows }}>
        <TableCell colSpan={colSpan} />
      </TableRow>
    )}
  </TableBody>
)

export default DataTableBody
