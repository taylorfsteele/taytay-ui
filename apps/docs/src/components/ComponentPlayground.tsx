import { Button, Component, type ButtonProps, type ComponentProps } from "@taytay-ui/react";
import {
  useState,
  type ButtonHTMLAttributes,
  type ComponentType,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";

/**
 * We have to use this pattern of making a singleton of all the components
 * Because Astro can't support the render prop pattern.
 *
 * If We could use the render prop pattern, we would instead define the
 * component inside a `renderDemo` prop whose parameters were the props
 * that returned the component to render.
 *
 * Instead, we have to track and assign the props with a component, which
 * requires the component to know about all the compomnents available.
 * Kinda sucks but what can you do.
 */
const allComponents = {
  Button: Button as ComponentType<ButtonProps>,
  Component: Component as ComponentType<ComponentProps>,
};

type ComponentPropsType = {
  [K in keyof typeof allComponents]: React.ComponentProps<(typeof allComponents)[K]>;
};

export interface ComponentPlaygroundProps<
  T extends keyof typeof allComponents,
  K extends keyof ComponentPropsType[T],
> {
  component: T;
  things?: {
    propName: K;
    control: "input" | "switch";
    defaultValue: ComponentPropsType[T][K];
    options?: ComponentPropsType[T][K][];
  }[];
}

const Switch = ({
  handleUpdateProps,
  onChange = () => {},
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { handleUpdateProps: (checked: boolean) => void }) => (
  <input
    type="checkbox"
    {...props}
    onChange={(e) => {
      onChange(e);
      handleUpdateProps(e.target.checked);
    }}
  />
);

const controlComponents = {
  input: "input",
  switch: Switch,
};

export const ComponentPlayground = <
  T extends keyof typeof allComponents,
  K extends keyof ComponentPropsType[T],
>({
  component,
  things = [],
}: ComponentPlaygroundProps<T, K>) => {
  const Component = allComponents[component];
  const allProps = things.reduce(
    (prevValue, currValue) => ({
      ...prevValue,
      [currValue.propName]: currValue.defaultValue,
    }),
    {} as React.ComponentProps<any>,
  );

  const [propsState, setPropsState] = useState(allProps);

  return (
    <>
      {things.map((propConfig) => {
        const ControlComponent = controlComponents[propConfig.control];

        return (
          <ControlComponent
            handleUpdateProps={(value) =>
              setPropsState((prev: Record<string, any>) => ({
                ...prev,
                [propConfig.propName]: value,
              }))
            }
          />
        );
      })}
      <Component {...propsState} />
    </>
  );
};

<ComponentPlayground
  component="Button"
  things={[{ control: "input", propName: "children", defaultValue: "nice" }]}
/>;
