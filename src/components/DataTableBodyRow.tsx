import * as React from 'react'

import TableRow from '@mui/material/TableRow'

import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyRowDetailButton from './DataTableBodyRowDetailButton'

import { Column, Row } from './types'

interface DataTableBodyRowProps<TRow, TContext> {
  row: TRow
  rows: TRow[]
  columns: Column<TRow, TContext>[]
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: TRow) => void
  rowIndex: number
  colSpan: number
  rowDetail?: (row: TRow, columns: Column<TRow, TContext>[]) => React.ReactNode
  disabled: boolean
  context: TContext
}

interface DataTableBodyRowState {
  showRowDetail: boolean
}

class DataTableBodyRow<TRow extends Row, TContext> extends React.Component<
  DataTableBodyRowProps<TRow, TContext>,
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
              <DataTableBodyCell<TRow, TContext>
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
            <DataTableBodyRowDetailCell<TRow, TContext>
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
