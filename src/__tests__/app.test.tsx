import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterComponent } from '../routes';

describe('App Screen', () => {
  beforeAll(() => {
    render(<RouterComponent />);
  });
  test('contains text in welcome screen', () => {
    expect(screen.getByText('Lets start building a beautiful application.')).toBeInTheDocument();
  });
});
