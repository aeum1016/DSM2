import { useCallback } from "react";
import { HStack } from "@chakra-ui/react";

import Question from "./Question/Question";

const Line = ({ index }) => {
  const renderQuestions = useCallback(() => {
    let rendered = [];
    for (let i = 0; i < 4; i++) {
      rendered.push(<Question key={i} index={index * 4 + i} />);
    }
    return rendered;
  }, []);

  return <HStack spacing="8em">{renderQuestions()}</HStack>;
};

export default Line;
