import { combineReducers } from "redux";

import attempts from "./attempts";
import user from "./user";
import game from "./game";

export default combineReducers({
  attempts,
  user,
  game,
});
