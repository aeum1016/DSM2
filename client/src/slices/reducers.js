import { combineReducers } from "redux";

import attempts from "./attempts";
import user from "./user";

export default combineReducers({
  attempts,
  user,
});
