import Button from '../components/elem_components/Button';
import FlexLayout, {
  FlexLayoutPlaceholder,
} from '../components/elem_components/FlexLayout';

export const COMPONENTS = [
  {
    Name: 'Button',
    Node: Button,
    props: {
      text: 'Demo Button',
    },
    placeholder: null,
    editable: true,
  },
  {
    Name: 'FlexLayout',
    Node: FlexLayout,
    props: {
      children: [],
    },
    placeholder: FlexLayoutPlaceholder,
    editable: true,
  },
];

export type COMPONENT_INFO = {
  Node: React.FC;
  props: Record<string, any>;
};
