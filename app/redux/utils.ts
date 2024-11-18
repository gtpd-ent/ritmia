import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";

function handleAsyncPending<StateType>(
  state: StateType,
  target: keyof StateType,
) {
  (state as any)[`${String(target)}Loading`] = true;
  (state as any)[`${String(target)}Error`] = null;
}

function handleAsyncFulfilled<StateType>(
  state: StateType,
  target: keyof StateType,
  payload: any,
) {
  (state as any)[`${String(target)}Loading`] = false;
  (state as any)[`${String(target)}Error`] = null;
  (state as any)[target] = payload;
}

function handleAsyncRejected<StateType>(
  state: StateType,
  target: keyof StateType,
  error: any,
) {
  (state as any)[`${String(target)}Loading`] = false;
  (state as any)[`${String(target)}Error`] = error;
}

export function handleAsyncActions<StateType>(
  builder: ActionReducerMapBuilder<StateType>,
  asyncThunk: AsyncThunk<any, any, any>,
  target: keyof StateType,
  overrides?: {
    fulfilled?: (state: StateType, payload: any) => void;
    pending?: (state: StateType) => void;
    rejected?: (state: StateType, error: any) => void;
  },
) {
  builder
    .addCase(asyncThunk.pending, (state: any) => {
      handleAsyncPending(state, target);
      overrides?.pending?.(state);
    })
    .addCase(asyncThunk.fulfilled, (state: any, action) => {
      handleAsyncFulfilled(state, target, action.payload);
      overrides?.fulfilled?.(state, action.payload);
    })
    .addCase(asyncThunk.rejected, (state: any, action) => {
      handleAsyncRejected(state, target, action.payload);
      overrides?.rejected?.(state, action.payload);
    });
}
