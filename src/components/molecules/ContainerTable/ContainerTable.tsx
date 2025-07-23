'use client'

import Table, { TableColumn } from '@/components/atoms/TableBancario/TableBancario';

interface ContainerTableProps {
    columns: TableColumn[];
    data: Record<string, React.ReactNode>[];
    icon?: React.ReactNode; // Optional icon prop
    title?: string; // Optional title prop
    description?: string; // Optional description prop
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Optional title tag prop
}

export default function ContainerTable({data, columns, icon, title, description, titleTag = 'h2'}: ContainerTableProps){
    const TitleComponent = titleTag;

    return(
        <div
            data-testid="table-container"
            className="flex p-4 mb-4 rounded-lg flex-col bg-gray-100 border-l-4 border-l-primary-500"
            style={{ borderLeftStyle: 'solid' }} //Não achei outra forma de fazer o border-left-solid, tive que usar o style
        >
            <div data-testid="table-header" className="flex mb-2 flex-col">
                <div className='flex flex-row'>
                    <div className='flex items-center justify-center mr-2'>
                        {icon && <span className='text-primary-500'>{icon}</span>}
                    </div>
                    <TitleComponent data-testid="table-title" className='text-secondary-800'>{title}</TitleComponent>
                </div>
                <p className='text-justify text-gray-600'>{description}</p>
            </div>
                <div data-testid="table" className='flex h-full items-center align-center justify-center'>
                    <Table columns={columns} data={data}/>
                </div>
        </div>
    )
}