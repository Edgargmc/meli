import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import UserProfile from "../pages/UserProfile.tsx";
import {Layout} from "../pages/Layout.tsx";
import {Home} from "../pages/Home.tsx";


describe('Should be Render Components with React Router', () => {

    it('Should be render Home in the base path', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <Layout />,
                children: [
                    { index: true, element: <Home /> },
                    { path: '/profile/:userId', element: <UserProfile /> },
                ],
            },
        ]);

        render(
            <RouterProvider router={router} />
        );

        expect(screen.getByText('Layout Mock')).toBeInTheDocument();
    });

    it('Should be render UserProfile for the path "/profile/:userId"', () => {
        const router = createMemoryRouter([
            {
                path: '/profile/:userId',
                element: <UserProfile />,
            },
        ], { initialEntries: ['/profile/123'] });

        render(
            <RouterProvider router={router} />
        );

        expect(screen.getByText('User Profile Mock')).toBeInTheDocument();
    });

    it('Should be render Home Component', () => {
        render(<Home />);
        expect(screen.getByText('Home Mock')).toBeInTheDocument();
    });
});

jest.mock('../pages/Layout.tsx', () => {
    return {
        __esModule: true,
        Layout: () => <div>Layout Mock</div>,
    };
});

jest.mock('../pages/Home.tsx', () => {
    return {
        __esModule: true,
        Home: () => <div>Home Mock</div>,
    };
});

jest.mock('../pages/UserProfile.tsx', () => {
    return {
        __esModule: true,
        default: () => <div>User Profile Mock</div>,
    };
});
