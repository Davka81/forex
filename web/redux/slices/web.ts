import { TypeFile } from "@/shared/global";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WebState {
  selectedFile: TypeFile | null;
  selectedFileList: Array<TypeFile>
  checkAll: boolean;
  folderRoute: Array<string>
}

const initialState: WebState = {
  selectedFile: null,
  checkAll: false,
  selectedFileList: [],
  folderRoute: [],
}

export const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    changeSelectedfile: (state, action) => {
      const file = action.payload;
      state.selectedFile = file;
    },
    changeSelectedFileList: (state, action) => {
      const { files, mode } = action.payload;
      if (mode) {
        state.selectedFileList = [...state.selectedFileList, files];
      } else {
        const idx = state.selectedFileList.findIndex(e => e.url === files.url);
        state.selectedFileList = [...state.selectedFileList.slice(0, idx), ...state.selectedFileList.slice(idx + 1, state.selectedFileList.length)];
      }
    },
    changeCheckAll: (state, action) => {
      const all = action.payload;
      state.checkAll = all;
    },
    changeFolderRoute: (state, action) => {
      const route = action.payload;
      state.folderRoute = route;
    },
    removeFolderRoute: (state, action) => {
      const mode = action.payload;
      if (mode === 'all') {
        state.folderRoute = [];
      } else {
        if (state.folderRoute.length > 0) {
          state.folderRoute = state.folderRoute.slice(0, -1);
        }
      }
    },
    addSelectedFileList: (state, action) => {
      const files = action.payload;
      state.selectedFileList = files
    }
  }
});

export const { changeSelectedfile, changeSelectedFileList, changeCheckAll, changeFolderRoute, removeFolderRoute, addSelectedFileList } = webSlice.actions;

export const selectWeb = (state: RootState) => state.web;

export default webSlice.reducer;