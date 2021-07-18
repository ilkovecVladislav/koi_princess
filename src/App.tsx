import { FC } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import Game from 'modules/Game';

const App: FC = () => (
  <ErrorBoundary>
    <section className="main">
      <Game />
    </section>
  </ErrorBoundary>
);

export default App;
