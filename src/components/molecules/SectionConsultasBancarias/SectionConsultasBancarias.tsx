
interface SectionProps {    
    title?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode; // Adicione esta linha para permitir conteúdo filho
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Section({ title, icon, children, titleTag = 'h2' }: SectionProps) {
    const TitleComponent = titleTag;
    
    return (
        <div
                data-testid="section-container"
                className="flex w-full p-4 mb-2 rounded-lg flex-col bg-gray-100 border-l-4 border-l-primary-500"
                style={{ borderLeftStyle: 'solid' }} //Não achei outra forma de fazer o border-left-solid, tive que usar o style
        >
            <div data-testid="section-header" className="flex mb-2 ">
                    <div className='flex mr-2'>
                        {icon && <span className='text-primary-500 flex items-center'>{icon}</span>}
                    </div>
                    <TitleComponent data-testid="section-title" className='text-secondary-800'>{title}</TitleComponent>
            </div>
            <div className="flex">
                {children}
            </div>
        </div>
    )
}