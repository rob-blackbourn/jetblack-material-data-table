import * as React from 'react'

import TableRow from '@mui/material/TableRow'

import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyRowDetailButton from './DataTableBodyRowDetailButton'

import { Row, Column } from './types'

interface DataTableBodyRowProps {
  row: Row
  columns: Column[]
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: Row) => void
  rowIndex: number
  colSpan: number
  rowDetail?: (row: Row, columns: Column[]) => React.ReactNode
  disabled: boolean
}

interface DataTableBodyRowState {
  showRowDetail: boolean
}

class DataTableBodyRow extends React.Component<
  DataTableBodyRowProps,
  DataTableBodyRowState
> {
  state: DataTableBodyRowState = {
    showRowDetail: false,
  }

  render() {
    const {
      row,
      columns,
      isSelected,
      isSelectable,
      onSelected,
      rowIndex,
      colSpan,
      rowDetail,
      disabled
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
              onChange={(showRowDetail) => this.setState({ showRowDetail })}
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
          {columns.map((column, columnIndex) => (
            <DataTableBodyCell
              key={`body-${rowIndex}-${columnIndex}`}
              row={row}
              column={column}
              columns={columns}
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
              columns={columns}
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
