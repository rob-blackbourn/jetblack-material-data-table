import * as React from "react"
import IconButton from "@material-ui/core/IconButton"
import ClearIcon from "@material-ui/icons/Clear"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"

interface FilterTextFieldProps {
  text: string
  title: string
  onChange: (filterText: string) => void
}

const FilterTextField = ({
  text,
  title,
  onChange,
  className,
}: FilterTextFieldProps & { className: string }) => (
  <TextField
    className={className}
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
