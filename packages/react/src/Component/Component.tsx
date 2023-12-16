export interface ComponentProps {
  cool?: boolean;
}

export const Component = ({ cool }: ComponentProps) => {
  return <div>{cool ? "cool" : "not cool"}</div>;
};
