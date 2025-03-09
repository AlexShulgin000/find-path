import {Devvit} from "@devvit/public-api";
import {Text} from "../../components/text/Text.js";
import {THEME} from "../../theme.js";
import {Stat} from "../../components/stat/Stat.js";
import {TorchScene} from "../../components/torch-scene/TorchScene.js";
import {Button} from "../../components/button/Button.js";
import {IPageProps} from "../../types.js";

export const GameStatFail = ({context}: IPageProps) => {
  const appWidth = context.dimensions?.width;
  const isDown470 = appWidth && appWidth <= 470;

  return (
    <TorchScene>
      <Text size={5} color={THEME.colors.blood}>
        FAIL
      </Text>
      <Stat context={context} />
      {isDown470 ? (
        <>
          <hstack padding="small" width="100%">
            <Button>Create own</Button>
          </hstack>
          <hstack padding="small" width="100%">
            <Button>Retry</Button>
          </hstack>
        </>
      ) : (
        <hstack width="100%" padding="medium" gap="medium">
          <hstack width="50%">
            <Button>Create own</Button>
          </hstack>
          <hstack width="50%">
            <Button>Retry</Button>
          </hstack>
        </hstack>
      )}
    </TorchScene>
  );
};
