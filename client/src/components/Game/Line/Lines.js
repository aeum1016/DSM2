import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLine } from "../../../slices/game";
import Line from "./Line";

const Lines = () => {
  const dispatch = useDispatch();
  const currentLine = useSelector((state) => state.game.currentLine);
  const questions = useSelector((state) => state.game.questions);

  useEffect(() => {
    if (currentLine * 4 + 8 > questions.length) {
      dispatch(createLine());
    }
  }, [currentLine, questions]);

  const renderLines = useCallback(() => {
    return [
      <Line key={currentLine} index={currentLine} />,
      <Line key={currentLine + 1} index={currentLine + 1} />,
    ];
  }, [currentLine]);

  return renderLines();
};

export default Lines;
