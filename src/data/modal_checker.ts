import { SxProps } from '@mui/system';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Type for our state
export interface ConfirmContextProps {
  message?: string;
  info?: string;
  is_loading?: boolean;
  actions?: {
    on_click: {
      args: any[];
      func: (checkbox_checked: boolean, ...args) => Promise<any | void>;
    }
  };
  checkbox?: {
    checkbox_label: string;
    checkbox_info: string;
  };
}
export interface ConfirmData {
  checkbox_checked: boolean;
}

export interface ContextState {
  isProfileImage: boolean;
  profileImagePreview: File | null;
  isConfirm: boolean;
  isLogin: boolean;
  isWarning: boolean;
  warningMessage: string;
  isInfo: boolean;
  isSignup: boolean;
  isVerify: boolean;
  isModalOpen: boolean;
  isProfileEdit: boolean;
  isProjectsList: boolean;
  isAddingProject: boolean;
  isEditingProject: boolean;
  editingProject: any;
  order_id: string | null,
  isOrderModal: boolean;
  isFilterModal: boolean;
  confirm_props: ConfirmContextProps;
  confirmation_data: ConfirmData;
}

// Initial state
const initialState: ContextState = {
  isProfileImage: false,
  profileImagePreview: null,
  isConfirm: false,
  isWarning: false,
  warningMessage: '',
  isInfo: false,
  isLogin: false,
  isSignup: false,
  isVerify: false,
  isProfileEdit: false,
  isAddingProject: false,
  isProjectsList: false,
  isEditingProject: false,
  editingProject: null,
  isModalOpen: false,
  order_id: null,
  isOrderModal: false,
  isFilterModal: false,
  confirmation_data: {
    checkbox_checked: false
  },
  confirm_props: {
    message: '',
    info: '',
    is_loading: false,
    actions: {
      on_click: {
        args: [],
        func: async () => Promise<void>
      }
    },
    checkbox: {
      checkbox_label: '',
      checkbox_info: '',
    },
  }
};

// Actual Slice
const modalChecker = createSlice({
  name: "modal_checker",
  initialState,
  reducers: {

    // Action to set the authentication status
    setLoginState(state, action) {
      state.isLogin = action.payload;
    },
    setConfirmState(state, action: PayloadAction<boolean>) {
      state.isConfirm = action.payload;
      if (action.payload == false) {
        state.confirm_props = initialState.confirm_props
        state.confirmation_data = initialState.confirmation_data
      }
    },
    setSignupState(state, action) {
      state.isSignup = action.payload;
    },
    setWarningState(state, action) {
      state.isWarning = action.payload;
    },
    setWarningMessage(state, action) {
      state.warningMessage = action.payload;
    },
    setInfoState(state, action) {
      state.isInfo = action.payload;
    },
    setAddingProjectState(state, action) {
      state.isAddingProject = action.payload;
    },
    setEditingProjectState(state, action) {
      state.isEditingProject = action.payload;
    },
    setEditingProject(state, action) {
      state.editingProject = action.payload;
    },
    setProjectsListState(state, action) {
      state.isProjectsList = action.payload;
    },
    setVerifyState(state, action) {
      state.isVerify = action.payload;
    },
    setFiltersModal(state, action) {
      state.isFilterModal = action.payload
    },
    setOpenModal(state, action) {
      state.isModalOpen = action.payload;
    },

    setProfileEditState(state, action) {
      state.isProfileEdit = action.payload;
    },
    setProfileImageState(state, action) {
      state.isProfileImage = action.payload;
    },
    setProfileImagePreview(state, action: PayloadAction<File | null>) {
      state.profileImagePreview = action.payload;
    },
    setOpenOrderModal(state, action) {
      const { isOpen, order_id } = action.payload
      state.isOrderModal = isOpen
      state.order_id = order_id
    },

    setConfirmProps(state, action: PayloadAction<ConfirmContextProps>) {
      if (action.payload.message) state.confirm_props.message = action.payload.message;
      if (action.payload.info) state.confirm_props.info = action.payload.info;
      if (action.payload.is_loading) state.confirm_props.is_loading = action.payload.is_loading;
      if (action.payload.actions) state.confirm_props.actions = action.payload.actions;
      if (action.payload.checkbox) state.confirm_props.checkbox = action.payload.checkbox;
    },
    resetConfirmProps(state) {
      state.confirm_props = initialState.confirm_props
    },
    setConfirmData(state, action: PayloadAction<ConfirmData>) {
      state.confirmation_data = action.payload;
    },
    resetConfirmData(state) {
      state.confirmation_data = {
        checkbox_checked: false
      }
    },

  },
});

export const {
  setProjectsListState,
  setEditingProject,
  setEditingProjectState,
  setAddingProjectState,
  setProfileImagePreview,
  setWarningState,
  setWarningMessage,
  setInfoState,
  setProfileImageState,
  setConfirmState,
  setLoginState,
  setSignupState,
  setProfileEditState,
  setVerifyState,
  setOpenModal,
  setOpenOrderModal,
  setFiltersModal,
  setConfirmProps,
  resetConfirmProps,
  setConfirmData,
  resetConfirmData
} = modalChecker.actions;

export const selectEditingProject = (state: any) => state?.modal_checker?.editingProject
export const reducer = modalChecker.reducer;