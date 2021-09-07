import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
//import { customThemePreset } from 'ui/CustomTheme/myPresetDefault';

const App = () => (
  <Theme preset={presetGpnDefault}>
    <>
      <Dashboard/>
    </>
  </Theme>
);


export default App;
