import React from 'react';
import {
  StylesApiProps,
  factory,
  useProps,
  useStyles,
  createVarsResolver,
  Factory,
  Modal,
  ModalProps,
  ModalStylesNames,
  getDefaultZIndex,
} from '@mantine/core';
import { SpotlightProvider } from './Spotlight.context';
import {
  useSpotlight,
  SpotlightStore,
  spotlightStore,
  closeSpotlight,
  openSpotlight,
  toggleSpotlight,
} from './spotlight.store';
import { SpotlightSearch } from './SpotlightSearch';
import classes from './Spotlight.module.css';

export type SpotlightStylesNames = ModalStylesNames | 'search';
export type SpotlightVariant = string;
export type SpotlightCssVariables = {
  root: '--test';
};

export interface SpotlightProps
  extends StylesApiProps<SpotlightFactory>,
    Omit<ModalProps, 'styles' | 'classNames' | 'vars' | 'opened' | 'onClose'> {
  store?: SpotlightStore;
}

export type SpotlightFactory = Factory<{
  props: SpotlightProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightStylesNames;
  vars: SpotlightCssVariables;
  variant: SpotlightVariant;
  staticComponents: {
    Search: typeof SpotlightSearch;
    open: typeof openSpotlight;
    close: typeof closeSpotlight;
    toggle: typeof toggleSpotlight;
  };
}>;

const defaultProps: Partial<SpotlightProps> = {
  size: 600,
  yOffset: 120,
  zIndex: getDefaultZIndex('max'),
  overlayProps: { opacity: 0.2, blur: 7 },
  store: spotlightStore,
};

const varsResolver = createVarsResolver<SpotlightFactory>(() => ({
  root: {
    '--test': 'test',
  },
}));

export const Spotlight = factory<SpotlightFactory>((_props, ref) => {
  const props = useProps('Spotlight', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    yOffset,
    zIndex,
    overlayProps,
    store,
    children,
    ...others
  } = props;

  const { opened } = useSpotlight(store);

  const getStyles = useStyles<SpotlightFactory>({
    name: 'Spotlight',
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

  return (
    <SpotlightProvider value={{ getStyles }}>
      <Modal
        ref={ref}
        {...getStyles('root')}
        {...others}
        withCloseButton={false}
        opened={opened}
        padding={0}
        onClose={() => closeSpotlight(store)}
      >
        {children}
      </Modal>
    </SpotlightProvider>
  );
});

Spotlight.classes = classes;
Spotlight.displayName = '@mantine/core/Spotlight';
Spotlight.Search = SpotlightSearch;
Spotlight.open = openSpotlight;
Spotlight.close = closeSpotlight;
Spotlight.toggle = toggleSpotlight;