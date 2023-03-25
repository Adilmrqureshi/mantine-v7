import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  polymorphicFactory,
  ElementProps,
  useComponentDefaultProps,
  useStylesApi,
  useComponentVars,
  MantineRadius,
  getRadius,
} from '../../core';
import classes from './BackgroundImage.module.css';

export type BackgroundImageStylesNames = 'root';
export type BackgroundImageVariant = string;
export type BackgroundImageCssVariables = '--bi-radius';

export interface BackgroundImageStylesParams {
  radius: MantineRadius | string | number | undefined;
}

export interface BackgroundImageProps
  extends BoxProps,
    StylesApiProps<
      BackgroundImageStylesNames,
      BackgroundImageVariant,
      BackgroundImageCssVariables
    > {
  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem (1rem = 16px), `0` by default */
  radius?: MantineRadius | string | number;
}

export interface BackgroundImageFactory {
  props: BackgroundImageProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: BackgroundImageStylesNames;
  vars: BackgroundImageCssVariables;
  stylesParams: BackgroundImageStylesParams;
}

const defaultProps: Partial<BackgroundImageProps> = {
  radius: 0,
};

export const BackgroundImage = polymorphicFactory<BackgroundImageFactory>((props, ref) => {
  const { classNames, className, style, styles, unstyled, vars, radius, ...others } =
    useComponentDefaultProps('BackgroundImage', defaultProps, props);

  const getStyles = useStylesApi({
    name: 'BackgroundImage',
    className,
    style,
    classes,
    classNames,
    styles,
    unstyled,
  });

  const _vars = useComponentVars<BackgroundImageStylesParams>('BackgroundImage', vars, { radius });

  return (
    <Box
      ref={ref}
      {...getStyles('root')}
      vars={{
        '--bi-radius': getRadius(radius),
        ..._vars,
      }}
      {...others}
    />
  );
});

BackgroundImage.displayName = '@mantine/core/BackgroundImage';
