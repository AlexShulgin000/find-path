import {Devvit} from "@devvit/public-api";

interface IFieldBlockProps {
  children?: JSX.Element[];
}

export const FieldRow = ({children}: IFieldBlockProps) => {
  return (
    <hstack alignment="center" width="100%">
      {children ?? null}
    </hstack>
  );
};
