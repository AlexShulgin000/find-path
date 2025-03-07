import {THEME} from "../../theme.js";
import {Text} from "../../components/text/Text.js";
import {Button} from "../../components/button/Button.js";
import {Devvit} from "@devvit/public-api";
import {IPageProps} from "../../types.js";
import {EPage} from "../../const.js";

export const StartPage = ({onChangeActivePage}: IPageProps) => {
    const handleStart = () => {
        onChangeActivePage(EPage.game)
    };

    const handleShowLeaderTable = () => {
        console.log('add table');
    };

    return (
        <zstack width="100%" height="100%" alignment="top start">
            <image
                imageHeight={576}
                imageWidth={768}
                height="100%"
                width="100%"
                url="start.jpg"
                description="Dark background"
                resizeMode="cover"
            />
            <vstack alignment="middle center" width="100%" height="100%">
                <hstack
                    width="100%"
                    height="20%"
                    gap="small"
                    alignment="center middle"
                    padding="small">
                    <hstack
                        width="15px"
                        height="60%"
                        backgroundColor={THEME.colors.additionalLight}
                        cornerRadius="medium"
                    />
                    <hstack
                        width="25px"
                        height="80%"
                        backgroundColor={THEME.colors.additionalLight}
                        cornerRadius="medium"
                    />
                    <hstack
                        width="50px"
                        height="80%"
                        backgroundColor={THEME.colors.additionalDark}
                        cornerRadius="small"
                    />
                    <hstack
                        width="25px"
                        height="80%"
                        backgroundColor={THEME.colors.additionalLight}
                        cornerRadius="medium"
                    />
                    <hstack
                        width="15px"
                        height="60%"
                        backgroundColor={THEME.colors.additionalLight}
                        cornerRadius="medium"
                    />
                </hstack>
                <hstack height="20%" alignment="center" padding="medium">
                    <Text size={4}>Find path</Text>
                </hstack>
                <vstack width="40%" gap="small" minWidth='240px'>
                    <Button onClick={handleStart}>Start</Button>
                    <Button onClick={handleShowLeaderTable}>Show leaders</Button>
                </vstack>
            </vstack>
        </zstack>
    );
}
