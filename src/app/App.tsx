import React, {useState, useEffect, useRef} from 'react';
import { AppStoreProvider, appStore } from './appStore';
import {AppContent} from './AppContent';

export function App() {
  return (
    <AppStoreProvider store={appStore}>
      <AppContent/>
    </AppStoreProvider>
  );
}