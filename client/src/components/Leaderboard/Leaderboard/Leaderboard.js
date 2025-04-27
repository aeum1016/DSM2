import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbysetting } from "../../../slices/attempts";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetBoundsString, GetGameModeString } from "../../../util/SettingUtil";
import { GameModes } from "../../../slices/game";
import { getUsernameThunk } from "../../../slices/user";

const Leaderboard = ({ setting }) => {
  const dispatch = useDispatch();
  const settingString = JSON.stringify(setting);

  const leaderboardAttempts = useSelector(
    (state) => state.attempts.leaderboardAttempts,
  );
  const knownUsers = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(
      getbysetting({
        setting: settingString,
        sort:
          setting.mode === GameModes.COMPLETIONS
            ? GameModes.DURATION
            : GameModes.COMPLETIONS,
      }),
    );
  }, [setting]);

  useEffect(() => {
    const users = [
      ...new Set(
        leaderboardAttempts[settingString]?.map((attempt) => attempt.UserID),
      ),
    ];

    users?.forEach((user) => {
      if (!(user in knownUsers)) {
        dispatch(getUsernameThunk(user));
      }
    });
  }, [leaderboardAttempts]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          <Text>{GetGameModeString(setting)}</Text>
          <Text>{GetBoundsString(setting)}</Text>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Questions</Th>
            <Th>Time (Seconds)</Th>
            <Th>Speed (QPM)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboardAttempts[settingString]?.map((attempt) => (
            <Tr key={`${attempt.UserID}${attempt.Time}`}>
              <Td>{knownUsers[attempt.UserID]}</Td>
              <Td>{attempt.Completed}</Td>
              <Td>{(attempt.Time / 1000).toFixed(2)}</Td>
              <Td>
                {((attempt.Completed * 60) / (attempt.Time / 1000)).toFixed(2)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
