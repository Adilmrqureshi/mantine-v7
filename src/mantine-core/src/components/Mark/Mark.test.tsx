import { tests } from '@mantine/tests';
import { Mark, MarkProps, MarkStylesNames } from './Mark';

const defaultProps: MarkProps = {};

describe('@mantine/core/Mark', () => {
  tests.itSupportsSystemProps<MarkProps, MarkStylesNames>({
    component: Mark,
    props: defaultProps,
    styleProps: true,
    children: true,
    extend: true,
    refType: HTMLElement,
    displayName: '@mantine/core/Mark',
    stylesApiSelectors: ['root'],
  });
});
