import React, { useEffect } from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  createVarsResolver,
  Factory,
  PortalProps,
  OptionalPortal,
  useResolvedStylesApi,
  getDefaultZIndex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, DropzoneProps, DropzoneVariant, DropzoneStylesNames } from './Dropzone';
import classes from './Dropzone.module.css';

export type DropzoneFullScreenStylesNames = DropzoneStylesNames | 'fullScreen';
export type DropzoneFullScreenCssVariables = {
  root: '--test';
};

export interface DropzoneFullScreenProps
  extends BoxProps,
    Omit<DropzoneProps, 'styles' | 'classNames' | 'vars' | 'variant'>,
    StylesApiProps<DropzoneFullScreenFactory>,
    ElementProps<'div', 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onDragEnter'> {
  /** Determines whether user can drop files to browser window, true by default */
  active?: boolean;

  /** z-index value, 9999 by default */
  zIndex?: React.CSSProperties['zIndex'];

  /** Determines whether component should be rendered within Portal, true by default */
  withinPortal?: boolean;

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;
}

export type DropzoneFullScreenFactory = Factory<{
  props: DropzoneFullScreenProps;
  ref: HTMLDivElement;
  stylesNames: DropzoneFullScreenStylesNames;
  vars: DropzoneFullScreenCssVariables;
  variant: DropzoneVariant;
}>;

const defaultProps: Partial<DropzoneFullScreenProps> = {
  loading: false,
  maxSize: Infinity,
  activateOnClick: true,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  active: true,
  zIndex: getDefaultZIndex('max'),
  withinPortal: true,
};

const varsResolver = createVarsResolver<DropzoneFullScreenFactory>(() => ({
  root: {
    '--test': 'test',
  },
}));

export const DropzoneFullScreen = factory<DropzoneFullScreenFactory>((_props, ref) => {
  const props = useProps('DropzoneFullScreen', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    active,
    onDrop,
    onReject,
    zIndex,
    withinPortal,
    portalProps,
    ...others
  } = props;

  const getStyles = useStyles<DropzoneFullScreenFactory>({
    name: 'DropzoneFullScreen',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DropzoneFullScreenFactory>({
    classNames,
    styles,
    props,
  });

  const [counter, setCounter] = React.useState(0);
  const [visible, { open, close }] = useDisclosure(false);

  const handleDragEnter = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes('Files')) {
      setCounter((prev) => prev + 1);
      open();
    }
  };

  const handleDragLeave = () => {
    setCounter((prev) => prev - 1);
  };

  useEffect(() => {
    counter === 0 && close();
  }, [counter]);

  useEffect(() => {
    if (!active) return undefined;

    document.addEventListener('dragenter', handleDragEnter, false);
    document.addEventListener('dragleave', handleDragLeave, false);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter, false);
      document.removeEventListener('dragleave', handleDragLeave, false);
    };
  }, [active]);

  return (
    <OptionalPortal {...portalProps} withinPortal={withinPortal}>
      <Box
        {...getStyles('fullScreen')}
        ref={ref}
        style={{
          ...style,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'all' : 'none',
          zIndex,
        }}
      >
        <Dropzone
          {...others}
          classNames={resolvedClassNames}
          styles={resolvedStyles}
          unstyled={unstyled}
          className={classes.dropzone}
          onDrop={(files: any) => {
            onDrop?.(files);
            close();
          }}
          onReject={(files: any) => {
            onReject?.(files);
            close();
          }}
        />
      </Box>
    </OptionalPortal>
  );
});

DropzoneFullScreen.displayName = '@mantine/core/DropzoneFullScreen';

export type DropzoneFullScreenType = typeof DropzoneFullScreen;
