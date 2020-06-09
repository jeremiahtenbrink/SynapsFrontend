import React from 'react';
import renderer from 'react-test-renderer';

import {PrimaryButton} from './PrimaryButton.js';


test('StyledButton render correctly', () => {
    const tree = renderer.create(<PrimaryButton />).toJSON();
    expect(tree).toMatchSnapshot();
});

