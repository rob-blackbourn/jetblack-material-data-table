import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import Table from '@mui/material/Table'

import DataTableHead from './DataTableHead'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import { filterRows } from './utils'
import { Row, Column, ColumnSortMap } from './types'

interface DataTableProps<TContext> {
  className?: string
  style?: React.CSSProperties
  columns: Column<TContext>[]
  rows: Row[]
  selected?: Row[]
  isSelectable?: boolean
  onSelectionChanged?: (rows: Row[]) => void
  filterText?: string
  paginate?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  rowDetail?: (row: Row, columns: Column<TContext>[]) => React.ReactNode
  size?: 'small' | 'medium'
  padding?: 'normal' | 'checkbox' | 'none'
  stickyHeader?: boolean
  compareRow?: (lhs: Row, rhs: Row) => boolean
  columnSortMap?: ColumnSortMap
  disabled?: boolean
  context?: TContext
  sx?: SxProps<Theme>
}

interface DataTableState {
  page: number
  rowsPerPage: number
  columnSortMap: ColumnSortMap
}

class DataTable<TContext = any> extends React.Component<
  DataTableProps<TContext>,
  DataTableState
> {
  constructor(props: DataTableProps<TContext>) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: props.rowsPerPage || 10,
      columnSortMap: props.columnSortMap || {},
    }
  }

  handlePageChange = (page: number) => this.setState({ page })

  handleRowsPerPageChange = (rowsPerPage: number) =>
    this.setState({ rowsPerPage })

  handleSelectAllClick = (
    isInvert: boolean,
    isChecked: boolean,
    filteredRows: Row[],
    onSelectionChanged?: (rows: Row[]) => void
  ) => {
    const { rows } = this.props
    const prevSelected = this.props.selected || []

    const unfilteredRows = rows.filter(row => !filteredRows.includes(row))

    const filteredUnselected = filteredRows.filter(
      row => !prevSelected.includes(row)
    )
    const unfilteredSelected = unfilteredRows.filter(row =>
      prevSelected.includes(row)
    )

    const selected = isInvert
      ? filteredUnselected.concat(unfilteredSelected)
      : isChecked
      ? unfilteredSelected.concat(filteredRows)
      : unfilteredSelected

    if (onSelectionChanged) {
      onSelectionChanged(selected)
    }
  }

  handleClick = (row: Row, onSelectionChanged?: (rows: Row[]) => void) => {
    const prevSelected = this.props.selected || []
    const selected = prevSelected.includes(row)
      ? prevSelected.filter(r => r !== row)
      : [...prevSelected, row]
    if (onSelectionChanged) {
      onSelectionChanged(selected)
    }
  }

  handleSort = (column: Column<TContext>, isAdditive: boolean) => {
    const { columnSortMap } = this.state

    if (isAdditive) {
      if (column.id in columnSortMap) {
        // Switch direction
        this.setState({
          columnSortMap: {
            ...columnSortMap,
            [column.id]: columnSortMap[column.id] === 'asc' ? 'desc' : 'asc',
          },
        })
      } else {
        // Add a new column
        this.setState({
          columnSortMap: {
            ...columnSortMap,
            [column.id]: 'asc',
          },
        })
      }
    } else {
      // Rest the sort to this column.
      this.setState({
        columnSortMap: {
          [column.id]: columnSortMap[column.id] === 'asc' ? 'desc' : 'asc',
        },
      })
    }
  }

  render() {
    const { page, rowsPerPage, columnSortMap } = this.state
    const {
      columns,
      rows,
      paginate = true,
      rowsPerPageOptions = [rowsPerPage, rowsPerPage * 2, rowsPerPage * 5],
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
      context = null,
      columnSortMap: _columnSortMap,
      ...rest
    } = this.props

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
      <Table
        size={size}
        padding={padding}
        stickyHeader={stickyHeader}
        {...rest}
      >
        <DataTableHead
          columns={columns}
          isSelectable={isSelectable}
          numSelected={numSelected}
          rowCount={filteredRows.length}
          onSelectAllClick={(isInvert, isChecked) =>
            this.handleSelectAllClick(
              isInvert,
              isChecked,
              filteredRows,
              onSelectionChanged
            )
          }
          columnSortMap={columnSortMap}
          onSort={this.handleSort}
          hasRowDetail={hasRowDetail}
          disabled={disabled}
        />
        <DataTableBody
          rows={filteredRows}
          columns={columns}
          selected={selected}
          columnSortMap={columnSortMap}
          paginate={paginate}
          page={page}
          rowsPerPage={rowsPerPage}
          colSpan={colSpan}
          isSelectable={isSelectable}
          onSelected={row => this.handleClick(row, onSelectionChanged)}
          compareRow={compareRow}
          emptyRows={emptyRows}
          rowDetail={rowDetail}
          disabled={disabled}
          context={context}
        />
        {paginate ? (
          <DataTableFooter
            colSpan={colSpan}
            rows={filteredRows}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            page={page}
            onPageChange={this.handlePageChange}
            onRowsPerPageChange={this.handleRowsPerPageChange}
          />
        ) : null}
      </Table>
    )
  }
}

export default DataTable
