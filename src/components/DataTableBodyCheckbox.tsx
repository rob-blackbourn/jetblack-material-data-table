import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

type DataTableBodyCheckboxProps = {
  isSelected: boolean
}

const DataTableBodyCheckbox = ({ isSelected }: DataTableBodyCheckboxProps) => (
  <TableCell padding='checkbox'>
    <Checkbox checked={isSelected} />
  </TableCell>
)

export default DataTableBodyCheckbox
