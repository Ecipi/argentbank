import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUserProfile = createAsyncThunk("auth/profile", async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;

    if (!token) {
      throw new Error("Aucun token disponible");
    }

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du profil");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getStoredAuth = () => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const storage = rememberMe ? localStorage : sessionStorage;

  const token = storage.getItem("authToken");
  const user = storage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    error: null,
    userProfile: null,
    rememberMe: rememberMe || false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getStoredAuth(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.userProfile = null;
      state.rememberMe = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      localStorage.setItem("rememberMe", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.body;
        state.token = action.payload.body.token;

        const storage = state.rememberMe ? localStorage : sessionStorage;
        storage.setItem("authToken", action.payload.body.token);
        storage.setItem("user", JSON.stringify(action.payload.body));
        localStorage.setItem("rememberMe", state.rememberMe);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        sessionStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setRememberMe } = authSlice.actions;
export default authSlice.reducer;
