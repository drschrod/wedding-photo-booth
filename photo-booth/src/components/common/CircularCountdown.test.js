import React from 'react';
import { render, screen } from '@testing-library/react';
import CircularCountdown from './CircularCountdown';


describe('CircularCountdown', () => {
    for (let index = 1; index < 100; index++) {
        test('Renders any number from 1-100 ${index}', () => {
            render(<CircularCountdown count={index} />);
            const linkElement = screen.getByText(index);
            expect(linkElement).toBeInTheDocument();
        });
    }
    for (let index = 0; index > -100; index--) {
        test('Renders a smiley face when count is 0 or lower', () => {
            render(<CircularCountdown count={0} />);
            const linkElement = screen.getByLabelText(/smile-face-icon/i);
            expect(linkElement).toBeInTheDocument();
        });
    }
});

