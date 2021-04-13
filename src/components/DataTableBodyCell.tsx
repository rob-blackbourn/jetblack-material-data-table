import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column } from './types'

type DataTableBodyCellProps = {
  row: Row
  column: Column
  columns: Column[]
}

const DataTableBodyCell: React.FC<DataTableBodyCellProps> = ({
  row,
  column,
  columns
}) => (
  <TableCell align={column.align}>
    {getRenderedValue(row, column, columns)}
  </TableCell>
)

export default DataTableBodyCell
