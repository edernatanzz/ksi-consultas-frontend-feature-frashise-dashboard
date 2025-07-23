import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";   
import { useState } from "react";

interface TabPainel{
    label: string
    id: string
    content: () => React.ReactNode
}

interface TabPainelProps{
    label: TabPainel[];
}

export function TabPainel({label}: TabPainelProps){
    const [value, setValue] = useState(label[0].id);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return(
        <div className="w-fit overflow-x-auto">
            <TabContext value={value}>
                <Box className="flex flex-col gap-4 justify-center items-center w-full" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="basic tabs example">
                        {label.map((item, index) => (
                            <Tab key={index} label={item.label} value={item.id} />
                        ))}
                    </TabList> 
                </Box>
                {label.map((item, index) => (
                    <TabPanel key={index} value={item.id}>
                        {item.content()}
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    )
}