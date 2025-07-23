'use client'

import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table, { TableColumn } from '@/components/atoms/TableBancario/TableBancario';


interface ResumoProps {
    columns: TableColumn[];
    data: Record<string, React.ReactNode>[];
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Resumo({data, columns, titleTag = "h2"}: ResumoProps){
    const TitleComponent = titleTag;
    const [expandido, setExpandido] = useState(false);

    return(
        <div
            data-testid="resumo-container"
            className="flex lg:w-full p-4 mb-2 rounded-lg flex-col bg-gray-100 border-l-4 border-l-primary-500"
            style={{ borderLeftStyle: 'solid' }} //Não achei outra forma de fazer o border-left-solid, tive que usar o style
        >
            <div data-testid="resumo-header" className="flex mb-2 ">
                <TitleComponent data-testid="resumo-title" className='text-secondary-800'>Resumo</TitleComponent>
                {expandido ? (
                    <ExpandMoreIcon 
                        data-testid="resumo-expand-more-icon"
                        fontSize='large' 
                        className='text-primary-500 cursor-pointer' 
                        onClick={() => setExpandido(false)} 
                    />
                ) : (
                    <ExpandLessIcon 
                        data-testid="resumo-expand-less-icon"
                        fontSize='large' 
                        className='text-primary-500 cursor-pointer' 
                        onClick={() => setExpandido(true)} 
                    />
                )}
            </div>
            {expandido && (
                <div data-testid="resumo-table-container">
                    <Table columns={columns} data={data}/>
                </div>
            )}
        </div>
    )
}