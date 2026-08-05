import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imageUrl: null,
  visible: false,
  locked: false,
  opacity: 0.5,
  position: { x: 0, y: 0 },
  scale: { x: 1, y: 1 },
  size: { width: 0, height: 0 }
}

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOverlayImage: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
      state.size = action.payload.size;
      state.visible = true;
    },
    setOverlayVisible: (state, action) => {
      state.visible = action.payload;
    },
    setOverlayLocked: (state, action) => {
      state.locked = action.payload;
    },
    setOverlayOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setOverlayPosition: (state, action) => {
      state.position = action.payload;
    },
    setOverlayScale: (state, action) => {
      state.scale = action.payload;
    },
    clearOverlay: (state) => {
      state.imageUrl = null;
      state.visible = false;
      state.locked = false;
      state.opacity = 0.5;
      state.position = { x: 0, y: 0 };
      state.scale = { x: 1, y: 1 };
      state.size = { width: 0, height: 0 };
    }
  },
})

export const { 
  setOverlayImage, 
  setOverlayVisible, 
  setOverlayLocked, 
  setOverlayOpacity, 
  setOverlayPosition, 
  setOverlayScale, 
  clearOverlay 
} = overlaySlice.actions

export default overlaySlice.reducer 