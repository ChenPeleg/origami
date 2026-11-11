import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import Catalog from './components/catalog/Catalog';
import Search from './components/search/Search';
import GuideOverview from './components/guide/GuideOverview';
import GuideStep from './components/guide/GuideStep';
import GuideDone from './components/guide/GuideDone';

/**
 * The paths here must match `GuideFlowService.paths`, which builds every link.
 */
export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Catalog />} />
                <Route path="/search" element={<Search />} />
                <Route path="/guide/:guideId" element={<GuideOverview />} />
                <Route
                    path="/guide/:guideId/step/:stepNumber"
                    element={<GuideStep />}
                />
                <Route path="/guide/:guideId/done" element={<GuideDone />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
