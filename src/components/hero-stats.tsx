import coin from "../assets/images/coin.png";
import { useGame } from "../hooks/use-game";
import { StatsBar } from "./stats-bar";

export const HeroStats = () => {
    const { coins, hero } = useGame();

    return (
        <div className="hero-stats stack horizontal center">
            <StatsBar type="health" maximum={hero.maxHealth} current={hero.health}>
                HP:
            </StatsBar>
            <StatsBar type="stamina" maximum={hero.maxStamina} current={hero.stamina}>
                Stamina:
            </StatsBar>
            <div className="text small">{coins.current}</div>
            <img className="w-xl h-xl" src={coin}></img>
        </div>
    );
};
