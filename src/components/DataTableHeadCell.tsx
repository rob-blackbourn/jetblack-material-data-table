import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'

import { Column, ColumnSortMap } from './types'

type DataTableHeadCellProps = {
  column: Column
  columnSortMap: ColumnSortMap
  onSort: (column: Column, isInvert: boolean) => void
}

const DataTableHeadCell = ({
  column,
  columnSortMap,
  onSort
}: DataTableHeadCellProps) => (
  <TableCell
    align={column.align}
    sortDirection={columnSortMap[column.id] || false}
  >
    <Tooltip
      title='Sort'
      placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
      enterDelay={300}
    >
      <TableSortLabel
        active={column.id in columnSortMap}
        direction={columnSortMap[column.id] || 'asc'}
        onClick={(event) => onSort(column, event.nativeEvent.shiftKey)}
      >
        {column.title}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
)

export default DataTableHeadCell
