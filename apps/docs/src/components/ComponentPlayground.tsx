import { Button, Component, type ButtonProps, type ComponentProps } from "@taytay-ui/react";
import { useState, type ComponentType, type InputHTMLAttributes } from "react";
import {
  playground,
  componentDemo,
  controls,
  title,
  components,
  switchComponent,
  inputComponent,
  radioComponent,
  item,
  indicator,
} from "./ComponentPlayground.module.css";
import * as RadioGroup from "@radix-ui/react-radio-group";

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
  propData?: {
    propName: K;
    label?: string;
    control?: "input" | "switch" | "radio";
    defaultValue: ComponentPropsType[T][K];
    options?: ComponentPropsType[T][K][] | undefined;
  }[];
}

interface ControlProps {
  label: string;
  options?: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const SwitchControl = ({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & ControlProps) => (
  <div className={switchComponent}>
    <label>{label}</label>
    <input type="checkbox" {...props} />
  </div>
);

const InputControl = ({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & ControlProps) => (
  <div className={inputComponent}>
    <label>{label}</label>
    <input {...props} />
  </div>
);

const RadioControl = ({
  label,
  options = [],
  defaultValue = "",
  onValueChange = () => {},
}: InputHTMLAttributes<HTMLInputElement> & ControlProps) => (
  <div>
    <span>{label}</span>
    <RadioGroup.Root className={radioComponent} defaultValue={defaultValue} onValueChange={onValueChange}>
      {options.map((option, index) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <RadioGroup.Item className={item} value={option} id={`rg-${index}`}>
            <RadioGroup.Indicator className={indicator} />
          </RadioGroup.Item>
          <label className="Label" htmlFor={`rg-${index}`}>
            {option}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </div>
);

export const ComponentPlayground = <
  T extends keyof typeof allComponents,
  K extends keyof ComponentPropsType[T],
>({
  component,
  propData = [],
}: ComponentPlaygroundProps<T, K>) => {
  const Component = allComponents[component];
  const allProps =
    propData.reduce(
      (prevValue, currValue) => ({
        ...prevValue,
        [currValue.propName]: currValue.defaultValue,
      }),
      {} as React.ComponentProps<any>,
    ) ?? {};

  const [propsState, setPropsState] = useState(allProps);

  return (
    <div className={`${playground} not-content`}>
      <div className={componentDemo}>
        <Component {...propsState} />
      </div>
      <div className={controls}>
        <p className={title}>Playground</p>
        <hr />
        <div className={components}>
          {propData.map((propConfig, index) => {
            if (!propConfig.control) return null;
            const label = propConfig.label ?? propConfig.propName.toString();

            if (propConfig.control === "input")
              return (
                <InputControl
                  key={index}
                  label={label}
                  onChange={(e) =>
                    setPropsState((prev: Record<string, any>) => ({
                      ...prev,
                      [propConfig.propName]: e.target.value,
                    }))
                  }
                />
              );

            if (propConfig.control === "switch")
              return (
                <SwitchControl
                  label={label}
                  onChange={(e) =>
                    setPropsState((prev: Record<string, any>) => ({
                      ...prev,
                      [propConfig.propName]: e.target.checked,
                    }))
                  }
                />
              );

            if (propConfig.control === "radio")
              return (
                <RadioControl
                  label={label}
                  options={propConfig.options as string[]}
                  defaultValue={propConfig?.defaultValue as string}
                  onValueChange={(value) =>
                    setPropsState((prev: Record<string, any>) => ({
                      ...prev,
                      [propConfig.propName]: value,
                    }))
                  }
                />
              );

            return null;
          })}
        </div>
      </div>
    </div>
  );
};