import React, { useState } from 'react';
import { Stack } from '@mantine/core';
import { DemoAreaProps } from '../DemoArea';
import { DemoCode } from '../DemoCode';
import { DemoColumns } from '../DemoColumns';
import { DemoRoot } from '../DemoRoot';
import {
  ConfiguratorBooleanControl,
  ConfiguratorSegmentedControl,
  ConfiguratorColorControl,
  ConfiguratorStringControl,
  ConfiguratorBooleanControlOptions,
  ConfiguratorSegmentedControlOptions,
  ConfiguratorColorControlOptions,
  ConfiguratorStringControlOptions,
} from './controls';
import { injectProps } from './inject-props';
import { clearProps } from './clear-props';
import classes from './ConfiguratorDemo.module.css';

const ControlComponents = {
  boolean: ConfiguratorBooleanControl,
  segmented: ConfiguratorSegmentedControl,
  color: ConfiguratorColorControl,
  string: ConfiguratorStringControl,
};

export type ConfiguratorControlOptions =
  | ConfiguratorBooleanControlOptions
  | ConfiguratorSegmentedControlOptions
  | ConfiguratorColorControlOptions
  | ConfiguratorStringControlOptions;

export interface ConfiguratorDemoProps extends DemoAreaProps {
  code: string;
  controls: ConfiguratorControlOptions[];
}

export function ConfiguratorDemo({
  code,
  controls,
  children,
  centered,
  maxWidth,
  withPadding,
}: ConfiguratorDemoProps) {
  const initialState = controls.reduce<Record<string, any>>((acc, control) => {
    acc[control.prop] = control.initialValue;
    return acc;
  }, {});

  const [state, setState] = useState(initialState);
  const setStateField = (field: string, value: any) =>
    setState((current) => ({ ...current, [field]: value }));

  const items = controls.map((control) => {
    const ControlComponent = ControlComponents[control.type] as any;
    const { initialValue, libraryValue, ...rest } = control;
    return (
      <ControlComponent
        key={control.prop}
        value={state[control.prop]}
        onChange={(value: any) => setStateField(control.prop, value)}
        {...rest}
      />
    );
  });

  return (
    <DemoRoot>
      <DemoColumns
        controls={
          <Stack className={classes.controls} gap="sm">
            {items}
          </Stack>
        }
        centered={centered}
        withPadding={withPadding}
        maxWidth={maxWidth}
      >
        {React.cloneElement(children as JSX.Element, state)}
      </DemoColumns>
      <DemoCode
        code={[
          {
            fileName: 'Demo.tsx',
            language: 'tsx',
            code: injectProps(clearProps(controls, state), code),
          },
        ]}
      />
    </DemoRoot>
  );
}