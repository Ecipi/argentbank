import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUsername = createAsyncThunk("user/updateUsername", async (newUsername, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;

    if (!token) {
      throw new Error("Aucun token disponible");
    }

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUsername }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification du nom d'utilisateur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const editSlice = createSlice({
  name: "edit",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEditStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUsername.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUsername.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEditStatus } = editSlice.actions;
export default editSlice.reducer;
