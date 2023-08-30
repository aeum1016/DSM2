import { useCallback } from "react";
import { useSelector } from "react-redux";
import { HStack } from "@chakra-ui/react";

import Question from "./Question/Question";

const Line = ({ index }) => {
  const questions = useSelector((state) => state.game.settings.questions);

  const renderQuestions = useCallback(() => {
    let rendered = [];
    for (let i = 0; i < Math.min(questions - index * 4, 4); i++) {
      rendered.push(<Question key={i} index={index * 4 + i} />);
    }
    return rendered;
  }, []);

  return <HStack spacing="8em">{renderQuestions()}</HStack>;
};

export default Line;
