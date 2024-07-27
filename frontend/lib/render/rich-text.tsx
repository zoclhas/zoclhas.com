import { serialize } from "./serialize";

export const Component = (props: any) => {
  const { content } = props;
  if (!content) return null;

  return serialize(content);
};
