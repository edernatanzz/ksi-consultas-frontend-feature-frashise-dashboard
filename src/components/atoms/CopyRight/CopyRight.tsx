import { Box, Typography } from "@mui/material"

export default function CopyRight() {
    return (
        <Box sx={{ borderTop: 1, borderColor: "divider", pt: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
                Copyright © 2017 Tecnologia. Todos os direitos reservados.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                Versão 6.0.0
            </Typography>
        </Box>
    )
}