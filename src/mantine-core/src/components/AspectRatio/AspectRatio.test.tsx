import { tests } from '@mantine/tests';
import { AspectRatio, AspectRatioProps, AspectRatioStylesNames } from './AspectRatio';

const defaultProps: AspectRatioProps = {};

describe('@mantine/core/AspectRatio', () => {
  tests.itSupportsSystemProps<AspectRatioProps, AspectRatioStylesNames>({
    component: AspectRatio,
    props: defaultProps,
    styleProps: true,
    children: true,
    extend: true,
    variant: true,
    size: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/AspectRatio',
    stylesApiSelectors: ['root'],
  });
});
