"use client"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"

interface PersonTypeSelectorProps {
  value: string
  onChange: (value: string) => void
  dataTestId: string
}

export function PersonTypeSelector({ value, onChange, dataTestId }: PersonTypeSelectorProps) {
  return (
    <div data-testid={dataTestId}>
      <FormLabel component="legend" className="text-sm font-medium mb-3 block">
        Tipo de pessoa
      </FormLabel>
      <RadioGroup
        value={value}
        onChange={(_, v) => onChange(v)}
        className="space-y-2 flex-col"
        row
      >
        <FormControlLabel
          value="fisica"
          control={<Radio />}
          label="Física"
        />
        <FormControlLabel
          value="juridica"
          control={<Radio />}
          label="Jurídica"
        />
      </RadioGroup>
    </div>
  )
}