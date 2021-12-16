import * as React from "react"

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import IconButton from "@mui/material/IconButton"
import ClearIcon from "@mui/icons-material/Clear"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"

interface FilterTextFieldProps {
  text: string
  title: string
  onChange: (filterText: string) => void
}

const FilterTextField = ({
  text,
  title,
  onChange,
  sx,
}: FilterTextFieldProps & { sx: SxProps<Theme> }) => (
  <TextField
    sx={sx}
    label={title}
    value={text}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => onChange("")}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    onChange={(event) => onChange(event.target.value)}
  />
)

export default FilterTextField
