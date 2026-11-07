import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewFormPage from './pages/NewFormPage';
import EditFormPage from './pages/EditFormPage';
import MainLayout from './layouts/MainLayout';
import { useAppInit } from './hooks/useAppInit.tsx';

export function AppRoutes() {
    useAppInit();
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forms/new" element={<NewFormPage />} />
                <Route path="/forms/:id/edit" element={<EditFormPage />} />
            </Route>
        </Routes>
    );
}
