export const determineAnswer = (operator, operand1, operand2) => {
  switch (operator) {
    default:
    case 0:
      return operand1 + operand2;
    case 1:
      return operand1 - operand2;
    case 2:
      return operand1 * operand2;
    case 3:
      return operand1 / operand2;
  }
};

export const generateQuestion = (operator, min, max) => {
  const operand1 = Math.floor(Math.random() * (1 + max - min)) + min;
  const operand2 = Math.floor(Math.random() * (1 + max - min)) + min;

  switch (operator) {
    default:
    case 0:
    case 1:
    case 2:
      return {
        operand1: Math.max(operand1, operand2),
        operand2: Math.min(operand1, operand2),
        operator: ["+", "-", "*", "/"][operator],
        answer: determineAnswer(
          operator,
          Math.max(operand1, operand2),
          Math.min(operand1, operand2)
        ),
      };
    case 3:
      return {
        operand1: operand1 * operand2,
        operand2: operand2,
        operator: ["+", "-", "*", "/"][operator],
        answer: determineAnswer(operator, operand1 * operand2, operand2),
      };
  }
};
