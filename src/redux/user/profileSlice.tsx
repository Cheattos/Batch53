/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { API } from "@/utils/api";
import getError from "@/utils/getError";

type initialStateT = {
    data: UserProfileType | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
};

const initialState: initialStateT = {
    data: null,
    isLoading: true,
    isError: false,
    error: "",
};
const jwtToken = localStorage.getItem("jwtToken");
if (!jwtToken) {
    throw new Error('JWT token not found in localStorage.');
}
const decodedToken = jwtToken.split('.')[1];
const userData = JSON.parse(atob(decodedToken));
const idUser = userData?.User?.id;

export const getProfile = createAsyncThunk(
    "profile",
    async (_, { rejectWithValue }) => {
        try {
            const id = idUser;

            const response = await API.get(`finduserbyid/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue({ errorMessage: getError(error) });
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {}, // tidak diisi karena memakai extraReducers
    extraReducers: async (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.isLoading = true;
            // data sedang diproses dari API kita setting true
        });
        builder.addCase(
            getProfile.fulfilled,
            // pemanggilan data API berhasil lalu di ambil datanya
            (state, action: PayloadAction<UserProfileType>) => {
                state.data = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            }
        );
        builder.addCase(
            getProfile.rejected,
            // datanya gagal diambil, lalu diambil juga data kesalahannya
            (state, action: PayloadAction<any>) => {
                state.data = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload?.errorMessage || "Unknown Error Occured";
            }
        );
    },
});

export default profileSlice.reducer;
