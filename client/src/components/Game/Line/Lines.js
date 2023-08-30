import { useCallback } from "react";
import Line from "./Line";
import { useSelector } from "react-redux";

const Lines = () => {
  const questions = useSelector((state) => state.game.settings.questions);
  const currentLine = useSelector((state) => state.game.currentLine);

  const renderLines = useCallback(() => {
    let rendered = [];
    for (
      let i = currentLine;
      i < Math.min(currentLine + 2, Math.ceil(questions / 4));
      i++
    ) {
      rendered.push(<Line key={i} index={i} />);
    }
    return rendered;
  }, [questions, currentLine]);

  return renderLines();
};

export default Lines;
