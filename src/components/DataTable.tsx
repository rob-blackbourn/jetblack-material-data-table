import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import Table from '@mui/material/Table'

import DataTableHead from './DataTableHead'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import { filterRows } from './utils'
import { Column, ColumnSortMap, Row } from './types'

export interface DataTableProps<TRow, TContext> {
  className?: string
  style?: React.CSSProperties
  columns: Column<TRow, TContext>[]
  rows: TRow[]
  selected?: TRow[]
  isSelectable?: boolean
  onSelectionChanged?: (rows: TRow[]) => void
  filterText?: string
  paginate?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  onPageChange?: (page: number, rowsPerPage: number) => void
  rowDetail?: (row: TRow, columns: Column<TRow, TContext>[]) => React.ReactNode
  size?: 'small' | 'medium'
  padding?: 'normal' | 'checkbox' | 'none'
  stickyHeader?: boolean
  compareRow?: (lhs: TRow, rhs: TRow) => boolean
  columnSortMap?: ColumnSortMap
  disabled?: boolean
  context?: TContext
  sx?: SxProps<Theme>
}

export default function DataTable<TRow extends Row = {}, TContext = null>({
  columns,
  rows,
  paginate = true,
  rowsPerPageOptions = [6, 10, 20],
  onPageChange,
  isSelectable = false,
  filterText = '',
  rowDetail,
  selected = [],
  size = 'medium',
  padding = 'normal',
  stickyHeader = false,
  compareRow,
  onSelectionChanged,
  disabled = false,
  context = null as unknown as TContext,
  rowsPerPage = 10,
  columnSortMap = {},
  ...rest
}: DataTableProps<TRow, TContext>) {
  const [page, setPage] = React.useState(0)
  const [localRowsPerPage, setLocalRowsPerPage] = React.useState(rowsPerPage)
  const [localColumnSortMap, setLocalColumnSortMap] =
    React.useState(columnSortMap)

  const handleSelectAllClick = (
    isInvert: boolean,
    isChecked: boolean,
    filteredRows: TRow[],
    onSelectionChanged?: (rows: TRow[]) => void
  ) => {
    const prevSelected = selected || []

    const unfilteredRows = rows.filter(row => !filteredRows.includes(row))

    const filteredUnselected = filteredRows.filter(
      row => !prevSelected.includes(row)
    )
    const unfilteredSelected = unfilteredRows.filter(row =>
      prevSelected.includes(row)
    )

    const selection = isInvert
      ? filteredUnselected.concat(unfilteredSelected)
      : isChecked
      ? unfilteredSelected.concat(filteredRows)
      : unfilteredSelected

    if (onSelectionChanged) {
      onSelectionChanged(selection)
    }
  }

  const handleClick = (
    row: TRow,
    onSelectionChanged?: (rows: TRow[]) => void
  ) => {
    const prevSelected = selected || []
    const selection = prevSelected.includes(row)
      ? prevSelected.filter(r => r !== row)
      : [...prevSelected, row]
    if (onSelectionChanged) {
      onSelectionChanged(selection)
    }
  }

  const handleSort = (column: Column<TRow, TContext>, isAdditive: boolean) => {
    if (isAdditive) {
      if (column.id in localColumnSortMap) {
        // Switch direction
        setLocalColumnSortMap({
          ...localColumnSortMap,
          [column.id]: localColumnSortMap[column.id] === 'asc' ? 'desc' : 'asc',
        })
      } else {
        // Add a new column
        setLocalColumnSortMap({
          ...localColumnSortMap,
          [column.id]: 'asc',
        })
      }
    } else {
      // Sort to this column.
      setLocalColumnSortMap({
        [column.id]: columnSortMap[column.id] === 'asc' ? 'desc' : 'asc',
      })
    }
  }

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    setLocalRowsPerPage(rowsPerPage)
    onPageChange && onPageChange(page, rowsPerPage)
  }

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page, localRowsPerPage)
    } else {
      setPage(page)
    }
  }

  const filteredRows = filterRows(rows, columns, filterText, context)
  const filteredSelected = filteredRows.filter(row => selected.includes(row))
  const emptyRows = paginate
    ? rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)
    : 0
  const numSelected = isSelectable ? filteredSelected.length : 0
  const hasRowDetail = rowDetail != null
  const colSpan =
    columns.length + (isSelectable ? 1 : 0) + (hasRowDetail ? 1 : 0)

  return (
    <Table size={size} padding={padding} stickyHeader={stickyHeader} {...rest}>
      <DataTableHead<TRow, TContext>
        columns={columns}
        isSelectable={isSelectable}
        numSelected={numSelected}
        rowCount={filteredRows.length}
        onSelectAllClick={(isInvert, isChecked) =>
          handleSelectAllClick(
            isInvert,
            isChecked,
            filteredRows,
            onSelectionChanged
          )
        }
        columnSortMap={localColumnSortMap}
        onSort={handleSort}
        hasRowDetail={hasRowDetail}
        disabled={disabled}
      />
      <DataTableBody<TRow, TContext>
        rows={filteredRows}
        columns={columns}
        selected={selected}
        columnSortMap={localColumnSortMap}
        paginate={paginate}
        page={page}
        rowsPerPage={localRowsPerPage}
        colSpan={colSpan}
        isSelectable={isSelectable}
        onSelected={row => handleClick(row, onSelectionChanged)}
        compareRow={compareRow}
        emptyRows={emptyRows}
        rowDetail={rowDetail}
        disabled={disabled}
        context={context}
      />
      {paginate ? (
        <DataTableFooter<TRow>
          colSpan={colSpan}
          rows={filteredRows}
          rowsPerPage={localRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      ) : null}
    </Table>
  )
}
