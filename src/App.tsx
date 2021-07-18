import { FC } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import Game from 'modules/Game';

const App: FC = () => (
  <section className="main">
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  </section>
);

export default App;
