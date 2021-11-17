import {
  Component,
  Suspense,
} from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useRoutes, Router, useData } from 'solid-app-router';
import { routes } from './routes';
import Header from './components/Header';
import { AppData } from './App.data';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';
import { useRegisterSW } from 'virtual:pwa-register/solid';
import createTimer, { Schedule } from '@solid-primitives/timer';
import ReloadPrompt from './components/ReloadPrompt';

export const App = () => {
  const Routes = useRoutes(routes);
  preventSmoothScrollOnTabbing();
  // Register the service work
  useRegisterSW({
    onRegistered(r) {
      r && createTimer(() => r.update(), 500, Schedule.Interval);
    }
  });

  return (
    <main class="min-h-screen">
      <Router data={AppData}>
        <Lang>
          <Header />
          {/* two div wrappers to make page animation work and performant */}
          <div id="main-content">
            <div>
              {/* <TransitionRoutes> */}
              <Suspense>
                <Routes />
              </Suspense>
              {/* </TransitionRoutes> */}
            </div>
          </div>
        </Lang>
      </Router>
      <ReloadPrompt />
    </main>
  );
};

const Lang: Component = (props) => {
  const data = useData<{ isDark: true; i18n: ReturnType<typeof createI18nContext> }>(0);
  const [t, { locale }] = data.i18n;
  return (
    <I18nContext.Provider value={data.i18n}>
      <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
      <Meta name="lang" content={locale()} />
      <div
        dir={t('global.dir', {}, 'ltr')}
        classList={{
          dark: data.isDark === true,
        }}
      >
        <div class="dark:bg-solid-gray dark:text-white">{props.children}</div>
      </div>
    </I18nContext.Provider>
  );
};
