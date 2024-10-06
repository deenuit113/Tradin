import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer, { RootState } from './rootReducer';

const expireTransform = createTransform(
    (inboundState: unknown, key) => {
        if (typeof inboundState === 'object' && inboundState !== null) {
            return {
                ...inboundState,
                _persist: {
                    ...(inboundState as any)._persist,
                    lastUpdated: Date.now()
                }
            };
        }
        return inboundState;
    },
    (outboundState: unknown, key) => {
        if (typeof outboundState === 'object' && outboundState !== null && '_persist' in outboundState) {
            const persist = (outboundState as any)._persist;
            if (persist && typeof persist.lastUpdated === 'number') {
                const now = Date.now();
                const minutesPassed = (now - persist.lastUpdated) / (1000 * 60);
                if (minutesPassed > 30) {
                    return undefined;
                }
            }
        }
        return outboundState;
    }
);

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    transforms: [expireTransform],
    whitelist: ['backtest'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;