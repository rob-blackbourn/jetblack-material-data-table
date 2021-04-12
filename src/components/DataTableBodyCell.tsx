import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'

import { getRenderedValue } from './utils'

import { Row, Column } from './types'

type DataTableBodyCellProps = {
  column: Column
  row: Row
}

const DataTableBodyCell: React.FC<DataTableBodyCellProps> = ({
  row,
  column
}) => (
  <TableCell align={column.align}>
    {getRenderedValue(row, column)}
  </TableCell>
)

export default DataTableBodyCell
