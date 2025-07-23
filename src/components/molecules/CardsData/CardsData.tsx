'use client'

import type { DashboardCard as DashboardCardType } from "@/data/dashboard"



interface CardsDataProps {
    dataCards: DashboardCardType[];
}

export function CardsData({dataCards}: CardsDataProps) {

    return (
            <div className="flex flex-col space-y-3 h-full items-center w-full" data-testid="cards-data-container">
                {dataCards.map((card, idx) => (
                    <div key={idx} className="w-full" data-testid={`card-wrapper-${idx}`}>
                        <div 
                            data-testid={`dashboard-card-${idx}`}
                            className="bg-white rounded-xl h-full shadow-md border border-gray-300"
                        >
                            <div className="block p-5 h-full no-underline" data-testid={`card-content-${idx}`}>
                                <div className="flex items-center gap-3" data-testid={`card-inner-${idx}`}>
                                    <div className="flex-shrink-0" data-testid={`card-icon-container-${idx}`}>
                                        <span 
                                            className="material-icons text-[32px] text-primary-500"
                                            data-testid={`card-icon-${idx}`}
                                        >
                                        {card.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1" data-testid={`card-text-container-${idx}`}>
                                        <h3 
                                            className="font-display font-medium text-base mb-1 text-secondary-800"
                                            data-testid={`card-title-${idx}`}
                                        >
                                        {card.title}
                                        </h3>
                                        <p 
                                            className="text-sm text-gray-500"
                                            data-testid={`card-subtitle-${idx}`}
                                        >
                                        {card.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    )
}