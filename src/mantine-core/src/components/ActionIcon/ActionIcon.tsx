import React, { forwardRef } from 'react';
import {
  BoxProps,
  useComponentDefaultProps,
  createPolymorphicComponent,
  StylesApiProps,
  useStylesApi,
  MantineSize,
  MantineColor,
  MantineGradient,
  getRadius,
  useMantineTheme,
  isNumberLike,
  rem,
} from '../../core';
import { UnstyledButton } from '../UnstyledButton';
import { LoaderProps } from '../Loader';
import classes from './ActionIcon.module.css';

export type ActionIconVariant = 'filled' | 'light';
export type ActionIconStylesNames = 'root';
export type ActionIconCssVariables =
  | '--radius'
  | '--size'
  | '--bg'
  | '--hover'
  | '--color'
  | '--bd';

export interface ActionIconProps extends BoxProps, StylesApiProps<ActionIconStylesNames> {
  __staticSelector?: string;

  /** Determines whether Loader component should be displayed instead of the icon */
  loading?: boolean;

  /** Props added to Loader component (only visible when `loading` prop is set) */
  loaderProps?: LoaderProps;

  /** Width and height of the button. Action has predefined xs-xl values, number value (in px) ix converted to rem (1rem = 16px). `md` by default */
  size?: MantineSize | string | number;

  /** Key of `theme.colors` or any valid CSS color, default value is `theme.primaryColor`  */
  color?: MantineColor | string;

  /** Key of theme.radius or any valid CSS value to set border-radius, `theme.defaultRadius` by default */
  radius?: MantineSize | string | number;

  /** Gradient styles used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: MantineGradient;
}

const defaultProps: Partial<ActionIconProps> = {
  variant: 'filled',
  size: 'md',
};

export const _ActionIcon: MantineComponent<ActionIconProps, HTMLButtonElement> = forwardRef(
  (props, ref) => {
    const {
      className,
      unstyled,
      variant,
      classNames,
      styles,
      style,
      loading,
      loaderProps,
      size,
      color,
      radius,
      __staticSelector,
      gradient,
      ...others
    } = useComponentDefaultProps('ActionIcon', defaultProps, props);

    const theme = useMantineTheme();

    const getStyles = useStylesApi({
      name: ['ActionIcon', __staticSelector],
      className,
      style,
      classes,
      classNames,
      styles,
      unstyled,
    });

    return (
      <UnstyledButton
        {...getStyles('root', { active: true })}
        {...others}
        data-variant={variant}
        ref={ref}
        vars={{
          '--size': isNumberLike(size) ? rem(size) : `var(--size-${size})`,
          '--radius': getRadius(theme, radius),
          ...theme.variantColorResolver({
            color: color || theme.primaryColor,
            theme,
            gradient,
            variant: variant!,
          }),
        }}
      />
    );
  }
);

_ActionIcon.displayName = '@mantine/core/ActionIcon';
_ActionIcon.extend = 10;

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(_ActionIcon);
