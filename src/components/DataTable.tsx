import * as React from 'react'
import { StyledComponentProps } from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table'
import DataTableHead from './DataTableHead'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import { filterRows } from './utils'
import { Row, Column, ColumnSortMap } from './types'

interface DataTableProps extends React.HTMLAttributes<HTMLElement> {
  columns: Column[]
  rows: Row[]
  initialSelected?: Row[]
  isSelectable?: boolean
  onSelectionChanged?: (rows: Row[]) => void
  filterText?: string
  paginate?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  rowDetail?: (row: Row, columns: Column[]) => React.ReactNode
}

interface DataTableState {
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
      selected: props.initialSelected || [],
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
    console.log(row)
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
    const { page, rowsPerPage, columnSortMap, selected } = this.state
    const {
      columns,
      rows,
      paginate = true,
      rowsPerPageOptions = [rowsPerPage, rowsPerPage * 2, rowsPerPage * 5],
      isSelectable = false,
      filterText = '',
      rowDetail,
      initialSelected,
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
      <Table {...rest} >
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
