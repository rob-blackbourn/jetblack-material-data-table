import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'

import { Row, Column } from './types'

type DataTableBodyRowDetailCellProps = {
  columns: Column[]
  row: Row
  rowDetail: (row: Row, columns: Column[]) => React.ReactNode
  colSpan: number
}

const DataTableBodyRowDetailCell: React.FC<DataTableBodyRowDetailCellProps> = ({
  row,
  columns,
  rowDetail,
  colSpan,
}) => <TableCell colSpan={colSpan}>{rowDetail(row, columns)}</TableCell>

export default DataTableBodyRowDetailCell
