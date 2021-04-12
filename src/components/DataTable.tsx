import * as React from 'react'
import Table from '@material-ui/core/Table'

import DataTableHead from './DataTableHead'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'

import { filterRows } from './utils'

import { Row, Column, ColumnSortMap } from './types'

type DataTableProps = {
  columns: Column[]
  rows: Row[]
  initialSelected?: Row[]
  isSelectable?: boolean
  onSelectionChanged?: (rows: Row[]) => void
  filterText?: string
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
}

type DataTableState = {
  page: number
  rowsPerPage: number
  columnSortMap: ColumnSortMap
  selected: Row[]
}

class DataTable extends React.Component<DataTableProps, DataTableState> {
  constructor(props: DataTableProps) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: props.rowsPerPage || 10,
      columnSortMap: {},
      selected: props.initialSelected || []
    }
  }

  handleChangePage = (page: number) => this.setState({ page })

  handleChangeRowsPerPage = (rowsPerPage: number) =>
    this.setState({ rowsPerPage })

  notifySelectionChanged = () => {
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(this.state.selected)
    }
  }

  handleSelectAllClick = (
    isInvert: boolean,
    isChecked: boolean,
    filteredRows: Row[]
  ) => {
    const { rows } = this.props
    const { selected: prevSelected } = this.state

    const unfilteredRows = rows.filter((row) => !filteredRows.includes(row))

    const filteredUnselected = filteredRows.filter(
      (row) => !prevSelected.includes(row)
    )
    const unfilteredSelected = unfilteredRows.filter((row) =>
      prevSelected.includes(row)
    )

    const selected = isInvert
      ? filteredUnselected.concat(unfilteredSelected)
      : isChecked
      ? unfilteredSelected.concat(filteredUnselected)
      : unfilteredSelected

    this.setState({ selected }, this.notifySelectionChanged)
  }

  handleClick = (row: Row) => {
    const { selected: prevSelected } = this.state
    const selected = prevSelected.includes(row)
      ? prevSelected.filter((r) => r !== row)
      : [...prevSelected, row]
    this.setState({ selected }, this.notifySelectionChanged)
  }

  handleSort = (column: Column, isAdditive: boolean) => {
    const { columnSortMap } = this.state

    if (isAdditive) {
      if (column.id in columnSortMap) {
        // Switch direction
        this.setState({
          columnSortMap: {
            ...columnSortMap,
            [column.id]: columnSortMap[column.id] === 'asc' ? 'desc' : 'asc'
          }
        })
      } else {
        // Add a new column
        this.setState({
          columnSortMap: {
            ...columnSortMap,
            [column.id]: 'asc'
          }
        })
      }
    } else {
      // Rest the sort to this column.
      this.setState({
        columnSortMap: {
          [column.id]: columnSortMap[column.id] === 'asc' ? 'desc' : 'asc'
        }
      })
    }
  }

  render() {
    const { page, rowsPerPage, columnSortMap, selected } = this.state
    const {
      columns,
      rows,
      rowsPerPageOptions = [rowsPerPage, rowsPerPage * 2, rowsPerPage * 5],
      isSelectable = false,
      filterText = ''
    } = this.props

    const filteredRows = filterRows(rows, columns, filterText)
    const filteredSelected = filteredRows.filter((row) =>
      selected.includes(row)
    )

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)

    const numSelected = isSelectable ? filteredSelected.length : 0
    const rowCount = filteredRows.length

    return (
      <Table>
        <DataTableHead
          columns={columns}
          isSelectable={isSelectable}
          numSelected={numSelected}
          rowCount={rowCount}
          onSelectAllClick={(isInvert, isChecked) =>
            this.handleSelectAllClick(isInvert, isChecked, filteredRows)
          }
          columnSortMap={columnSortMap}
          onSort={this.handleSort}
        />
        <DataTableBody
          rows={filteredRows}
          columns={columns}
          selected={selected}
          columnSortMap={columnSortMap}
          page={page}
          rowsPerPage={rowsPerPage}
          isSelectable={isSelectable}
          onSelected={this.handleClick}
          emptyRows={emptyRows}
        />
        <DataTableFooter
          colSpan={columns.length + (isSelectable ? 1 : 0)}
          rows={filteredRows}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Table>
    )
  }
}

export default DataTable
