import { Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import CatalogPage from './pages/CatalogPage';
import SearchPage from './pages/SearchPage';
import GuideOverviewPage from './pages/GuideOverviewPage';
import GuideStepPage from './pages/GuideStepPage';
import GuideDonePage from './pages/GuideDonePage';

/**
 * The paths here must match `GuideFlowService.paths`, which builds every link.
 */
export function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/guide/:guideId" element={<GuideOverviewPage />} />
                <Route
                    path="/guide/:guideId/step/:stepNumber"
                    element={<GuideStepPage />}
                />
                <Route
                    path="/guide/:guideId/done"
                    element={<GuideDonePage />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
