import { Box, Card, Checkbox, FormControlLabel } from "@mui/material";

interface CardOptionalData{
    item: string
    id: string
}

interface CardOptionalDataProps{
    data: CardOptionalData[]
    title?: string
    opcionalSelected: string[]
    setOpcionalSelected: (opcional: string[]) => void
}

export default function CardOptionalData({ data, title, opcionalSelected, setOpcionalSelected}: CardOptionalDataProps){
    const handleChange = (id: string) => {
        if (opcionalSelected.includes(id)) {
          setOpcionalSelected(opcionalSelected.filter(item => item !== id));
        } else {
          setOpcionalSelected([...opcionalSelected, id]);
        }
      };
    
    return (
        <div className="rounded-lg text-secondary-800 mb-4">
            <Card className="bg-gray-100 p-4 h-full" data-testid="dataOptional">
                {title && (
                    <Box sx={{ mb: 2 }}>
                        <h4>{title}</h4>
                    </Box>
                )}
                <p className="text-sm text-secondary-500 mb-4">
                    Selecione informações adicionais para incluir no relatório
                </p>
                <div className="flex flex-col mb-4 gap-0 w-full">
                    {data.map((row, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                id={row.id}
                                checked={opcionalSelected.includes(row.id)}
                                onChange={() => handleChange(row.id)}
                                />
                            }
                            label={row.item}
                        />
                    ))}
                </div>
            </Card>
        </div> 
    )
}