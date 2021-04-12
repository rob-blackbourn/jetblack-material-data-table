import * as React from 'react'
import TableRow from '@material-ui/core/TableRow'
import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'

import { Row, Column } from './types'

type DataTableBodyRowProps = {
  row: Row
  columns: Column[]
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: Row) => void
  rowIndex: number
}

const DataTableBodyRow = ({
  row,
  columns,
  isSelected,
  isSelectable,
  onSelected,
  rowIndex
}: DataTableBodyRowProps) => (
  <TableRow
    aria-checked={isSelected}
    role='checkbox'
    selected={isSelected}
    onClick={isSelectable ? () => onSelected(row) : undefined}
  >
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
)

export default DataTableBodyRow
