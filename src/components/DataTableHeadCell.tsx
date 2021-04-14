import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

import { Column, ColumnSortMap } from './types'

type DataTableHeadCellProps = {
  id: string
  column: Column
  columnSortMap: ColumnSortMap
  onSort: (id: string, isInvert: boolean) => void
}

const DataTableHeadCell = ({
  id,
  column,
  columnSortMap,
  onSort
}: DataTableHeadCellProps) => (
  <TableCell
    align={column.align}
    sortDirection={columnSortMap[id] || false}
  >
    <Tooltip
      title='Sort'
      placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
      enterDelay={300}
    >
      <TableSortLabel
        active={id in columnSortMap}
        direction={columnSortMap[id] || 'asc'}
        onClick={(event) => onSort(id, event.nativeEvent.shiftKey)}
      >
        {column.title}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
)

export default DataTableHeadCell
