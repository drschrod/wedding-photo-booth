import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PhotoWithLabel from './PhotoWithLabel';
// screen.logTestingPlaygroundURL()

describe('PhotoWithLabel', () => {
    const classes = jest.mock();
    const testimgPath = '/public/testimg.JPG';
    const todaysDate = new Date();
    const todaysDateString = todaysDate.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    beforeEach(() => render(<PhotoWithLabel photo={testimgPath} classes={classes} height={500} width={500}/>));
    afterEach(() => cleanup());
    test('Renders the image', () => {
        const linkElement = screen.getByLabelText(/photo with label/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('Renders the Primary Text', () => {
        const linkElement = screen.getByText(/esteban & meagan/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('Renders the date in desired format', () => {
        const linkElement = screen.getByText(todaysDateString);
        expect(linkElement).toBeInTheDocument();
    });
    test('Renders the image', () => {
        const linkElement = screen.getByLabelText(/photo with label/i);
        expect(linkElement).toBeInTheDocument();
    });
});

