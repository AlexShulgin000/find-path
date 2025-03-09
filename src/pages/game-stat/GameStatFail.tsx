import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";

export const GameStatFail = () => {
  return (
    <TorchScene>
      {/*  TODO transit vstack to MainBg if its the same in other components like here */}
      <Text size={5} color={THEME.colors.blood}>
        FAIL
      </Text>
      <Stat />
    </TorchScene>
  );
};
