import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'

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
