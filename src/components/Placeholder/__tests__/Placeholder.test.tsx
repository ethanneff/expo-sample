import { render, screen } from '@testing-library/react-native';
import { Text } from '~/components/Text/Text';
import { Placeholder } from '../Placeholder';

describe('Placeholder', () => {
  it('renders with title', () => {
    render(<Placeholder title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders with title and children', () => {
    render(
      <Placeholder title="Test Title">
        <Text title="Child Content" />
      </Placeholder>
    );

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Child Content')).toBeTruthy();
  });
});
