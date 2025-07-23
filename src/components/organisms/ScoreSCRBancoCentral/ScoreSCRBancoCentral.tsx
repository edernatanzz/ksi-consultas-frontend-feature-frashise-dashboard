import Medidor from "@/components/atoms/Medidor/Medidor";
import Badge from "@/components/atoms/Badge/Badge";


interface ScoreProps {
  score: number;
}

const getScoreInfo = (score: number) => {
  if (score >= 0 && score <= 200) {
    return { text: 'Péssimo', className: 'bg-red-800 text-white' };
  }
  if (score >= 201 && score <= 400) {
    return { text: 'Ruim', className: 'bg-red-500 text-white' };
  }
  if (score >= 401 && score <= 600) {
    return { text: 'Regular', className: 'bg-orange-400 text-white' };
  }
  if (score >= 601 && score <= 800) {
    return { text: 'Bom', className: 'bg-green-800 text-white' };
  }
  return { text: 'Ótimo', className: 'bg-green-500 text-white' };
};

export default function Score({ score }: ScoreProps) {
  const scoreInfo = getScoreInfo(score);

  return (
      <div className="flex w-full p-4 mb-2 rounded-lg flex-col" data-testid="score-container">
        <div className="flex flex-col items-center justify-between" data-testid="score-content">
            <div data-testid="score-medidor">
                <Medidor value={score} max={1000}/>
            </div>
            <div data-testid="score-badge">
                <Badge 
                        variant="profile"
                        type="custom"
                        className={`flex w-fit ${scoreInfo.className}`}
                >
                    {scoreInfo.text}
                </Badge>
            </div>
        </div>
        <div className="text-left mt-4" data-testid="score-legend">
            <div className="text-xs text-secondary-600 leading-relaxed">
                <div data-testid="score-range-pessimo"><strong>Péssimo:</strong> 0 a 200</div>
                <div data-testid="score-range-ruim"><strong>Ruim:</strong> 201 a 400</div>
                <div data-testid="score-range-regular"><strong>Regular:</strong> 401 a 600</div>
                <div data-testid="score-range-bom"><strong>Bom:</strong> 601 a 800</div>
                <div data-testid="score-range-otimo"><strong>Ótimo:</strong> 801 a 1000</div>
            </div>
        </div>
    </div>
  );
}