import * as React from 'react'

import TableRow from '@mui/material/TableRow'

import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyRowDetailButton from './DataTableBodyRowDetailButton'

import { Row, Column } from './types'

interface DataTableBodyRowProps<TContext> {
  row: Row
  rows: Row[]
  columns: Column<TContext>[]
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: Row) => void
  rowIndex: number
  colSpan: number
  rowDetail?: (row: Row, columns: Column<TContext>[]) => React.ReactNode
  disabled: boolean
  context: any
}

interface DataTableBodyRowState {
  showRowDetail: boolean
}

class DataTableBodyRow<TContext> extends React.Component<
  DataTableBodyRowProps<TContext>,
  DataTableBodyRowState
> {
  state: DataTableBodyRowState = {
    showRowDetail: false,
  }

  render() {
    const {
      row,
      rows,
      columns,
      isSelected,
      isSelectable,
      onSelected,
      rowIndex,
      colSpan,
      rowDetail,
      disabled,
      context,
    } = this.props
    const { showRowDetail } = this.state

    return (
      <>
        <TableRow
          aria-checked={isSelected}
          role="checkbox"
          selected={isSelected}
        >
          {rowDetail != null ? (
            <DataTableBodyRowDetailButton
              showRowDetail={showRowDetail}
              onChange={showRowDetail => this.setState({ showRowDetail })}
            />
          ) : null}
          {isSelectable ? (
            <DataTableBodyCheckbox
              key={`body-checkbox-${rowIndex}`}
              isSelected={isSelected}
              onChange={() => onSelected(row)}
              disabled={disabled}
            />
          ) : null}
          {columns
            .filter(column => !column.hide)
            .map((column, columnIndex) => (
              <DataTableBodyCell
                key={`body-${rowIndex}-${columnIndex}`}
                row={row}
                rows={rows}
                column={column}
                columns={columns}
                context={context}
              />
            ))}
        </TableRow>
        {rowDetail != null && showRowDetail ? (
          <TableRow
            aria-checked={isSelected}
            role="checkbox"
            selected={isSelected}
          >
            <DataTableBodyRowDetailCell
              row={row}
              rows={rows}
              columns={columns}
              context={context}
              colSpan={colSpan}
              rowDetail={rowDetail}
            />
          </TableRow>
        ) : null}
      </>
    )
  }
}

export default DataTableBodyRow
