import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbysetting } from "../../../slices/attempts";

const Leaderboard = ({ setting }) => {
  const dispatch = useDispatch();

  const leaderboardAttempts = useSelector((state) => state.attempts);

  console.log(leaderboardAttempts);

  useEffect(() => {
    dispatch(getbysetting(JSON.stringify(setting)));
  }, [setting]);

  return <></>;
};

export default Leaderboard;
