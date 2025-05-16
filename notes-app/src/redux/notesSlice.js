// src/redux/notesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_API_END_POINT } from './constants/userConstants';
import { selectUserToken } from './authSlice'; // Import selector to get token

// Fetch notes for the authenticated user
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { getState }) => {
  const token = selectUserToken(getState()); // Get the token from the Redux state

  const response = await axios.get(`${USER_API_END_POINT}/notes/get`, {
    headers: {
      Authorization: `Bearer ${token}`, // Add token to Authorization header
    },
  });

  return response.data; // Assuming response.data is the array of notes
});

// Create a new note
export const createNote = createAsyncThunk('notes/createNote', async (note, { rejectWithValue, getState }) => {
  const token = selectUserToken(getState()); // Get the token from the Redux state

  try {
    const response = await axios.post(`${USER_API_END_POINT}/notes/create`, note, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to create note');
  }
});

// Update an existing note
export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, note }, { rejectWithValue, getState }) => {
  const token = selectUserToken(getState()); // Get the token from the Redux state

  try {
    const response = await axios.put(`${USER_API_END_POINT}/notes/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to update note');
  }
});

// Delete a note
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id, { getState }) => {
  const token = selectUserToken(getState()); // Get the token from the Redux state

  await axios.delete(`${USER_API_END_POINT}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Add token to Authorization header
    },
  });

  return id; // Return the id of the deleted note
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch notes
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;  // Store the fetched notes
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;  // Capture error message
    });

    // Create note
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);  // Add newly created note to the list
    });
    builder.addCase(createNote.rejected, (state, action) => {
      state.error = action.payload;  // Capture any error that occurs during creation
    });

    // Update note
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id);
      if (index !== -1) {
        state.notes[index] = action.payload;  // Replace the updated note
      }
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.error = action.payload;  // Capture any error during the update
    });

    // Delete note
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);  // Remove the deleted note
    });
  },
});

export default notesSlice.reducer;

// Selector to get a note by ID
export const selectNoteById = (state, id) => state.notes.notes.find((note) => note._id === id);
