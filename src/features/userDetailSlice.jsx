import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Action
export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    const response = await fetch('https://65f55c90f54db27bc022f6d9.mockapi.io/crud', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
    })

    try {
        const result = await response.json()
        return result;
    } catch (error) {
        return rejectWithValue("Ooops! There is an error:" + error)
    }
})


// Read Action
export const showUser = createAsyncThunk('showUser', async (args, { rejectWithValue }) => {
    const response = await fetch('https://65f55c90f54db27bc022f6d9.mockapi.io/crud');

    try {
        const result = await response.json();
        return result
    } catch (error) {
        return rejectWithValue("Ooops! There is an error:" + error)
    }
});


// Delete Action
export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://65f55c90f54db27bc022f6d9.mockapi.io/crud/${id}`, {
        method: 'DELETE'
    });

    try {
        const result = await response.json();
        return result
    } catch (error) {
        return rejectWithValue("Ooops! There is an error:" + error)
    }

})

// Update Action
export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(`https://65f55c90f54db27bc022f6d9.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
    })

    try {
        const result = response.json()
        return result;
    } catch (error) {
        return rejectWithValue("Ooops! There is an error:" + error)
    }
})

const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },

    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload
            // console.log(action.payload)
        }
    },

    extraReducers: (builder) => {

        // For Create Functionality
        builder.addCase(createUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });

        // For Read functionality
        builder.addCase(showUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(showUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload;
            // console.log(action.payload);
        });
        builder.addCase(showUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });

        // For Delete Functionality
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false

            const { id } = action.payload

            console.log(action.payload);
            if (id) {
                state.users = state.users.filter((item) => item.id !== id);
            }

        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });

        // For Update Functionality
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map(ele => ele.id === action.payload.id ? action.payload : ele)
            console.log(action.payload);
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
    }
})

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;

