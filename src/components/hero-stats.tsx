import coin from "../assets/images/coin.png";
import health from "../assets/images/health.png";
import stamina from "../assets/images/stamina.png";
import { useGame } from "../hooks/use-game";

export const HeroStats = () => {
    const { coins, hero } = useGame();

    return (
        <div className="hero-stats stack horizontal center loose">
            <div className="stack horizontal center">
                <span className="text small offset-sm">
                    {hero.health} / {hero.maxHealth}
                </span>
                <img className="w-xl h-xl" src={health}></img>
            </div>
            <div className="stack horizontal center">
                <span className="text small offset-sm">
                    {hero.stamina} / {hero.maxStamina}
                </span>
                <img className="w-xl h-xl" src={stamina}></img>
            </div>
            <div className="claim-right"></div>
            <div className="stack horizontal center">
                <span className="text small offset-sm">{coins.current}</span>
                <img className="w-xl h-xl" src={coin}></img>
            </div>
        </div>
    );
};
