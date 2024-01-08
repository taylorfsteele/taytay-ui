import * as RadioGroup from "@radix-ui/react-radio-group";
import { ReactThemeProvider, useReactTheme } from "@taytay-ui/css";
import { blueTheme, orangeTheme } from "@taytay-ui/css/css-modules/themes.layer.module.css";
import { Button, type ButtonProps } from "@taytay-ui/react";
import { useState, type ComponentType, type InputHTMLAttributes, Fragment } from "react";
import {
  componentDemo,
  controls,
  indicator,
  inputComponent,
  item,
  playground,
  radioComponent,
  switchComponent,
  title,
} from "./ComponentPlayground.module.css";

const supportedThemes = { "Blue Theme": blueTheme, "Orange Theme": orangeTheme };

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
        <Fragment key={index}>
          <RadioGroup.Item className={item} value={option} id={`rg-${option}`}>
            <RadioGroup.Indicator className={indicator} />
          </RadioGroup.Item>
          <label htmlFor={`rg-${option}`}>{option}</label>
        </Fragment>
      ))}
    </RadioGroup.Root>
  </div>
);

const ThemeSelect = () => {
  const { theme, setTheme } = useReactTheme();

  return (
    <select name="theme" onChange={(e) => setTheme(e.target.value)}>
      {Object.keys(supportedThemes).map((themeName, index) => (
        <option key={index} selected={themeName === theme} value={themeName}>
          {themeName}
        </option>
      ))}
    </select>
  );
};

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
    <ReactThemeProvider themeClasses={supportedThemes} defaultTheme="Cool Theme">
      <div className={`${playground} not-content`}>
        <div className={componentDemo}>
          <Component {...propsState} />
        </div>
        <div className={controls}>
          <p className={title}>Playground</p>
          <ThemeSelect />
          <hr style={{ border: "solid 1px var(--sl-color-bg-accent)", borderRadius: "1px" }} />
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
    </ReactThemeProvider>
  );
};
