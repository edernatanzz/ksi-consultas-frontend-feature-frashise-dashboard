import { Card, Box } from "@mui/material";

interface CardDescription{
    item: string
}

interface CardDescriptionProps{
    data: CardDescription[]
    title?: string
}

export default function CardDescription({ data, title}: CardDescriptionProps){
    return (
        <div className="w-full lg:w-1/3">
                        <div className="m-3">
                            <Card className="bg-gray-100 p-6 rounded-md">
                                {title && (
                                    <Box sx={{ mb: 2 }}>
                                        <h4>{title}</h4>
                                    </Box>
                                )}
                                <ul className="space-y-2 text-sm text-secondary-800">
                                    {data.map((row, index) => (
                                        <li key={index}>{row.item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
        </div> 
    )
}