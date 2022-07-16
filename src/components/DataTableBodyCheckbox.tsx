import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'

export interface DataTableBodyCheckboxProps {
  isSelected: boolean
  disabled: boolean
  onChange: (isSelected: boolean) => void
}

export default function DataTableBodyCheckbox({
  isSelected,
  disabled,
  onChange,
}: DataTableBodyCheckboxProps) {
  return (
    <TableCell padding="checkbox">
      <Checkbox
        checked={isSelected}
        onChange={() => onChange(!isSelected)}
        disabled={disabled}
      />
    </TableCell>
  )
}
