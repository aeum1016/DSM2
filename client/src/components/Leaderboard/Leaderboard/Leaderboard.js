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

const Leaderboard = ({ setting }) => {
  const dispatch = useDispatch();
  const settingString = JSON.stringify(setting);

  const leaderboardAttempts = useSelector(
    (state) => state.attempts.leaderboardAttempts
  );

  useEffect(() => {
    dispatch(
      getbysetting({
        setting: settingString,
        sort: setting.mode === GameModes.COMPLETIONS ? "time" : "completed",
      })
    );
  }, [setting]);

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
            <Th>Time (Seconds)</Th>
            <Th>Questions per Minute</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboardAttempts[settingString]?.map((attempt) => (
            <Tr>
              <Td>{attempt.UserID}</Td>
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
