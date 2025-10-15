import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "@api";

// Async thunks
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, thunkAPI) => {
        try {
            const res = await API.Auth.login(credentials);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            const res = await API.Auth.REGISTER(userData);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// load current user / permissions from backend (e.g., /auth/me)
export const loadCurrentUser = createAsyncThunk(
    "auth/loadCurrentUser",
    async (_, thunkAPI) => {
        try {
            const res = await API.Auth.me();
            return { user: res.user || res };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    user: null,
    token: null,
    permissions: [],
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user || null;
            state.token = token || null;
            state.permissions = user?.permissions || [];
            state.isAuthenticated = !!user;
        },
        logout: (state) => Object.assign(state, initialState),
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            const payload = action.payload;
            // payload expected to contain { user, token }
            state.user = payload.user || null;
            state.token = payload.token || null;
            state.permissions = payload.user?.permissions || [];
            state.isAuthenticated = !!payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || action.payload; })

        .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            const payload = action.payload;
            state.user = payload.user || null;
            state.token = payload.token || null;
            state.permissions = payload.user?.permissions || [];
            state.isAuthenticated = !!payload.user;
        })
        .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || action.payload; })

        .addCase(loadCurrentUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loadCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            const payload = action.payload; // expecting { user }
            state.user = payload.user || null;
            state.permissions = payload.user?.permissions || [];
            state.isAuthenticated = !!payload.user;
        })
        .addCase(loadCurrentUser.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || action.payload; state.user = null; state.isAuthenticated = false; state.permissions = []; });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
