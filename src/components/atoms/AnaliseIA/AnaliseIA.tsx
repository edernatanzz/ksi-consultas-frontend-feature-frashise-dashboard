import { Card, CardContent } from "@mui/material"
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

interface AnaliseIAProps {
  texto?: string;
}

export function AnaliseIA({texto}: AnaliseIAProps) {
  return (
    <Card className="flex lg:w-full p-4 mb-2 rounded-lg flex-col bg-secondary-50">
      <div className="p-2">
        <h1 className="text-lg flex items-center gap-2">
          <span className="text-red-500">
            <WarningOutlinedIcon role="img" aria-label="Alerta"/>
          </span>
          Conclusão Análise Inteligente
        </h1>
      </div>
      <CardContent>
        <div className="flex items-start gap-3">
          <SmartToyOutlinedIcon className="text-gray-500" role="img" aria-label="Ícone de robô" />
          <p className="text-sm text-justify">
            {texto}
            O crédito não pode ser aprovado devido à quantidade significativa de pendências financeiras registradas e ao
            score de crédito baixo. Recomenda-se regularizar as pendências antes de solicitar um novo crédito.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}