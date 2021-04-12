import * as React from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { stableSort } from './utils'
import DataTableBodyRow from './DataTableBodyRow'

import { Row, Column, ColumnSortMap } from './types'

type DataTableBodyProps = {
  rows: Row[]
  columns: Column[]
  selected: Row[]
  columnSortMap: ColumnSortMap
  page: number
  rowsPerPage: number
  colSpan: number
  isSelectable: boolean
  onSelected: (row: Row) => void
  emptyRows: number
  rowDetail?: (row: Row, columns: Column[]) => React.ReactNode
}

const DataTableBody = ({
  rows,
  columns,
  selected,
  columnSortMap,
  page,
  rowsPerPage,
  colSpan,
  isSelectable,
  onSelected,
  emptyRows,
  rowDetail,
}: DataTableBodyProps) => (
  <TableBody>
    {stableSort(rows, columns, columnSortMap)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, rowIndex) => (
        <DataTableBodyRow
          key={`body-${rowIndex}`}
          row={row}
          columns={columns}
          isSelected={isSelectable && selected.includes(row)}
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
