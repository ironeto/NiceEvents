import React, { useState, useEffect, useRef } from "react";
import {
  AppStoreProvider,
  appStore,
  appPersistor,
  AppStorePersistGate,
} from "./appStore";
import { AppContent } from "./AppContent";

export function App() {
  return (
    <AppStoreProvider store={appStore}>
      <AppStorePersistGate persistor={appPersistor}>
        <AppContent />
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}
