import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

type DataTableBodyCheckboxProps = {
  isSelected: boolean
  disabled: boolean
  onChange: (isSelected: boolean) => void
}

const DataTableBodyCheckbox = ({
  isSelected,
  disabled,
  onChange,
}: DataTableBodyCheckboxProps) => (
  <TableCell padding="checkbox">
    <Checkbox
      checked={isSelected} onChange={() => onChange(!isSelected)}
      disabled={disabled}
    />
  </TableCell>
)

export default DataTableBodyCheckbox
