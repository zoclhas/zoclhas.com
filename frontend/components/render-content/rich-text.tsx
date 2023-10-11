import React from "react";
import serialize from "./serialize";

export const Component = (props: any) => {
  const { content } = props;

  return (
    <div>
      <RichText content={content} />
    </div>
  );
};

const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content) {
    return null;
  }

  return <div className={className}>{serialize(content)}</div>;
};

export default RichText;
