import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column, ColumnMap } from './types'

type DataTableBodyCellProps = {
  row: Row
  id: string
  column: Column
  columns: ColumnMap
}

const DataTableBodyCell: React.FC<DataTableBodyCellProps> = ({
  row,
  id,
  column,
  columns
}) => (
  <TableCell align={column.align}>
    {getRenderedValue(row, id, column, columns)}
  </TableCell>
)

export default DataTableBodyCell
