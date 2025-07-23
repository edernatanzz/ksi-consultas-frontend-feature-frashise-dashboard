import type { ReactNode } from "react"
import { Printer } from "lucide-react"
import { Button } from "@/components/atoms/Button/Button";
import Image from 'next/image'
import { Box, Typography, Grid } from "@mui/material";
import  AssignmentRounded  from "@mui/icons-material/AssessmentRounded";

export interface ResultadosTemplateProps {
    children: ReactNode
    document: string
    personType: string
    onNovaConsulta:() => void // Callback para chamar nova consulta
    title: string
}

export function ResultadosTemplate({ children, document, personType, onNovaConsulta, title }: ResultadosTemplateProps) {    
    return(
        <div className="flex flex-col w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 justify-center items-center">
            <div className="flex-1 flex flex-col w-full">
                <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-4 md:space-y-6 overflow-x-auto w-full">
                    <Box className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2 w-full">
                        <Box className="flex gap-1 w-full md:w-auto justify-center md:justify-start">
                            <Button variant="outline" size="small">
                                <Printer className="w-4 h-4 mr-1" />
                                Imprimir
                            </Button>
                            <Button data-testid="nova-consulta-button" variant="outline" size="small" onClick={onNovaConsulta}>
                                <Printer className="w-4 h-4 mr-1" />
                                Nova Consulta
                            </Button>
                        </Box>
                        <Box className="text-right w-full md:w-auto flex flex-col items-end">
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={48}
                                height={48}
                                className="w-auto h-12 object-contain bg-secondary-800 p-2 rounded-lg"
                                quality={100}
                                priority
                                unoptimized
                            />
                            <Typography variant="caption" className="text-secondary-600 block">
                                Desde 2011 trabalhamos para você crescer
                            </Typography>
                            <Typography variant="caption" className="text-secondary-600">
                                Data: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="flex items-center mb-4">
                        <Typography variant="h4" className="font-bold text-secondary-800">
                            <AssignmentRounded fontSize="large" className="text-primary-500 align-bottom mb-1 mr-1"/>
                            {title}
                        </Typography>
                    </Box>

                    <Grid container spacing={2} className="gap-8">
                        {personType === "fisica" ? (
                            <>
                                <Grid className="xs={6}">
                                    <Box className="flex mb-1">
                                        <Typography variant="body2" className="font-medium">
                                            Roberta Santos Oliveira
                                        </Typography>
                                    </Box>
                                    <Box className="flex gap-4">
                                        <Typography variant="body2" className="font-medium">
                                            Data de Nascimento:
                                        </Typography>
                                        <Typography variant="body2">30/07/2000</Typography>
                                    </Box>
                                </Grid>
                                <Grid className="xs={6}">
                                    <Box className="flex gap-4 mb-1">
                                        <Typography variant="body2" className="font-medium">
                                        CPF:
                                        </Typography>
                                        <Typography variant="body2">
                                        {document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                                        </Typography>
                                    </Box>
                                    <Box className="flex gap-4">
                                        <Typography variant="body2" className="font-medium">
                                        Nome da mãe:
                                        </Typography>
                                        <Typography variant="body2"> Rosangela Santos Oliveira </Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid className="xs={6}">
                                    <Box className="flex gap-4 mb-1">
                                        <Typography variant="body2" className="font-medium">
                                            Nome da empresa:
                                        </Typography>
                                        <Typography variant="body2">
                                            União Norte Brasileira da Igreja Adventista do Sétimo Dia
                                        </Typography>
                                    </Box>
                                    <Box className="flex gap-4">
                                        <Typography variant="body2" className="font-medium">
                                            Fundação:
                                        </Typography>
                                        <Typography variant="body2">17/10/2017</Typography>
                                    </Box>
                                </Grid>
                                <Grid className="xs={6}">
                                    <Box className="flex gap-4 mb-1">
                                        <Typography variant="body2" className="font-medium">
                                            CNPJ:
                                        </Typography>
                                        <Typography variant="body2">
                                            {document ? document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ""}
                                        </Typography>                                  
                                    </Box>
                                    <Box className="flex gap-4">
                                        <Typography variant="body2" className="font-medium">
                                            Situação:
                                        </Typography>
                                        <Typography variant="body2"> ATIVA </Typography>
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <div className="flex-1 p-4">{children}</div>
                </div>
            </div>
        </div>
    )
}