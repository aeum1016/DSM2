import { GameModes } from "../slices/game";

export const GetGameModeString = (setting) => {
  const gameMode =
    setting.mode === GameModes.COMPLETIONS ? "Completions" : "Duration";
  const gameEnds =
    setting.mode === GameModes.COMPLETIONS ? "Questions" : "Seconds";

  return `${gameMode} - ${setting.endAt} ${gameEnds}`;
};

export const GetBoundsString = (setting) => {
  return `Addition {${setting.min.add}-${setting.max.add}} Subtraction {${setting.min.sub}-${setting.max.sub}} Multiplication {${setting.min.mult}-${setting.max.mult}} Division {${setting.min.div}-${setting.max.div}}`;
};
