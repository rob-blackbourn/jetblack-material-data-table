import * as React from 'react'
import TableRow from '@material-ui/core/TableRow'
import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyShowDetailButton from './DataTableBodyRowDetailButton'

import { Row, Column, ColumnMap } from './types'

interface DataTableBodyRowProps {
  row: Row
  columns: ColumnMap
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: Row) => void
  rowIndex: number
  colSpan: number
  rowDetail?: (row: Row, columns: ColumnMap) => React.ReactNode
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

    console.log(isSelected)
    return (
      <>
        <TableRow
          aria-checked={isSelected}
          role="checkbox"
          selected={isSelected}
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
              onChange={() => onSelected(row)}
            />
          ) : null}
          {Object.entries(columns)
            .sort((
              [_lhsId, {order:lhsOrder}],
              [_rhsId, {order: rhsOrder}]) =>
              lhsOrder - rhsOrder
            ).map(([id, column]) => (
            <DataTableBodyCell
              key={`body-${rowIndex}-${id}`}
              row={row}
              id={id}
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
