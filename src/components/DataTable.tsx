import * as React from 'react'
import { StyledComponentProps } from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table'
import DataTableHead from './DataTableHead'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import { filterRows } from './utils'
import { Row, Column, ColumnSortMap } from './types'

interface DataTableProps {
  className?: string
  style?: React.CSSProperties
  columns: Column[]
  rows: Row[]
  selected?: Row[]
  isSelectable?: boolean
  onSelectionChanged?: (rows: Row[]) => void
  filterText?: string
  paginate?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  rowDetail?: (row: Row, columns: Column[]) => React.ReactNode
  size?: 'small' | 'medium'
  padding?: 'default' | 'checkbox' | 'none'
  stickyHeader?: boolean,
  compareRow?: (lhs: Row, rhs: Row) => boolean
}

interface DataTableState {
  page: number
  rowsPerPage: number
  columnSortMap: ColumnSortMap
}

class DataTable extends React.Component<DataTableProps, DataTableState> {
  constructor(props: DataTableProps) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: props.rowsPerPage || 10,
      columnSortMap: {}
    }
  }

  handleChangePage = (page: number) => this.setState({ page })

  handleChangeRowsPerPage = (rowsPerPage: number) =>
    this.setState({ rowsPerPage })

  notifySelectionChanged = (selected: Row[]) => {
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(selected)
    }
  }

  handleSelectAllClick = (
    isInvert: boolean,
    isChecked: boolean,
    filteredRows: Row[]
  ) => {
    const { rows } = this.props
    const prevSelected = this.props.selected || []

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

    this.notifySelectionChanged(selected)
  }

  handleClick = (row: Row) => {
    const prevSelected = this.props.selected || []
    const selected = prevSelected.includes(row)
      ? prevSelected.filter((r) => r !== row)
      : [...prevSelected, row]
    this.notifySelectionChanged(selected)
  }

  handleSort = (column: Column, isAdditive: boolean) => {
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
      padding = 'default',
      stickyHeader = false,
      compareRow,
      ...rest
    } = this.props

    const filteredRows = filterRows(rows, columns, filterText)
    const filteredSelected = filteredRows.filter((row) =>
      selected.includes(row)
    )
    const emptyRows = paginate
      ? rowsPerPage -
        Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)
      : 0
    const numSelected = isSelectable ? filteredSelected.length : 0
    const hasRowDetail = rowDetail != null
    const colSpan =
      columns.length + (isSelectable ? 1 : 0) + (hasRowDetail ? 1 : 0)

    return (
      <Table size={size} padding={padding} stickyHeader={stickyHeader} {...rest} >
        <DataTableHead
          columns={columns}
          isSelectable={isSelectable}
          numSelected={numSelected}
          rowCount={filteredRows.length}
          onSelectAllClick={(isInvert, isChecked) =>
            this.handleSelectAllClick(isInvert, isChecked, filteredRows)
          }
          columnSortMap={columnSortMap}
          onSort={this.handleSort}
          hasRowDetail={hasRowDetail}
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
          onSelected={this.handleClick}
          compareRow={compareRow}
          emptyRows={emptyRows}
          rowDetail={rowDetail}
        />
        {paginate ? (
          <DataTableFooter
            colSpan={colSpan}
            rows={filteredRows}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        ) : null}
      </Table>
    )
  }
}

export default DataTable
