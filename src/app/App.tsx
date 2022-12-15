import React, { useState, useEffect, useRef } from "react";
import {
  AppStoreProvider,
  appStore,
  appPersistor,
  AppStorePersistGate,
} from "./appStore";
import { AppContent } from "./AppContent";
import codePush from 'react-native-code-push';

export function AppContainer() {
  return (
    <AppStoreProvider store={appStore}>
      <AppStorePersistGate persistor={appPersistor}>
        <AppContent />
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}

export const App = codePush(AppContainer);