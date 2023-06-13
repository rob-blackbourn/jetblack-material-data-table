import * as React from 'react'

import TableRow from '@mui/material/TableRow'

import DataTableBodyCheckbox from './DataTableBodyCheckbox'
import DataTableBodyCell from './DataTableBodyCell'
import DataTableBodyRowDetailCell from './DataTableBodyRowDetailCell'
import DataTableBodyRowDetailButton from './DataTableBodyRowDetailButton'

import { Column, Row, RowDetailHandler } from './types'

interface DataTableBodyRowProps<TRow extends Row, TContext> {
  row: TRow
  rows: TRow[]
  columns: Column<TRow, TContext>[]
  isSelected: boolean
  isSelectable: boolean
  onSelected: (row: TRow) => void
  rowIndex: number
  colSpan: number
  rowDetail?: RowDetailHandler<TRow, TContext>
  disabled: boolean
  context: TContext
}

export default function DataTableBodyRow<TRow extends Row, TContext>({
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
}: DataTableBodyRowProps<TRow, TContext>) {
  const [showRowDetail, setShowRowDetail] = React.useState(false)

  return (
    <>
      <TableRow aria-checked={isSelected} role="checkbox" selected={isSelected}>
        {rowDetail && (
          <DataTableBodyRowDetailButton
            showRowDetail={showRowDetail}
            onChange={setShowRowDetail}
          />
        )}
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
