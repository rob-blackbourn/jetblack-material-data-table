import * as React from 'react'
import TableRow from '@material-ui/core/TableRow'
import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyShowDetailButton from './DataTableBodyRowDetailButton'

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
    } = this.props
    const { showRowDetail } = this.state

    return (
      <>
        <TableRow
          aria-checked={isSelected}
          role="checkbox"
          selected={isSelected}
          onClick={isSelectable ? () => onSelected(row) : undefined}
        >
          {rowDetail != null ? (
            <DataTableBodyShowDetailButton
              showRowDetail={showRowDetail}
              onChange={(showRowDetail) => this.setState({ showRowDetail })}
            />
          ) : null}
          {isSelectable ? (
            <DataTableBodyCheckbox
              key={`body-checkbox-${rowIndex}`}
              isSelected={isSelected}
            />
          ) : null}
          {columns.map((column, columnIndex) => (
            <DataTableBodyCell
              key={`body-${rowIndex}-${columnIndex}`}
              column={column}
              row={row}
            />
          ))}
        </TableRow>
        {rowDetail != null && showRowDetail ? (
          <TableRow>
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
