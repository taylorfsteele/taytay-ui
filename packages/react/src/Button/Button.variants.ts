import { cva } from "cva";
import {
  button as buttonStyles,
  disabled,
  fullWidth,
  primary,
  secondary,
  danger,
  info,
  success,
  neutral,
  warning,
  plain,
  outline,
  soft,
  solid,
  achromatic,
  xs,
  sm,
  md,
  lg,
  xl,
} from "./Button.module.css";

const colors = {
  primary,
  secondary,
  neutral,
  danger,
  info,
  success,
  warning,
};

const variants = {
  plain,
  outline,
  soft,
  solid,
  achromatic,
};

const size = {
  xs,
  sm,
  md,
  lg,
  xl,
};

export const button = cva({
  base: buttonStyles,
  variants: {
    disabled: {
      true: disabled,
    },
    fullWidth: {
      true: fullWidth,
    },
    color: colors,
    variant: variants,
    size,
  },
});
