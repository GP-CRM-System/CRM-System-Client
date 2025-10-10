import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "@api";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, thunkAPI) => {
        try {
            const res = await API.Auth.login(credentials);
            return res.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.user = null; },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
        .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
