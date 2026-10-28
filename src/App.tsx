import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Lab = lazy(() => import('./pages/Lab'));
const Notes = lazy(() => import('./pages/Notes'));

export default function App() {
  return (
    <SiteLayout>
      <Suspense fallback={<p role="status">Loading page…</p>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/lab" component={Lab} />
          <Route path="/notes" component={Notes} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </SiteLayout>
  );
}
