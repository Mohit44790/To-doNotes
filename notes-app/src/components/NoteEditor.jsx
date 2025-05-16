import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, updateNote } from '../redux/notesSlice';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectNoteById } from '../redux/notesSlice'; // Selector to get note by ID

const NoteEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the note ID from the URL

  // Select the note to be edited using the id
  const note = useSelector((state) => selectNoteById(state, id));

  // Prepopulate the form if a note is found
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCreatedAt(note.createdAt); // Set createdAt from the note
      setUpdatedAt(note.updatedAt); // Set updatedAt from the note
    }
  }, [note]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTimestamp = new Date().toISOString();

    if (id) {
      // Update the existing note
      dispatch(updateNote({
        id,
        note: {
          title,
          content,
          updatedAt: currentTimestamp, // Update the updatedAt timestamp
        },
      }));
      toast.success('Note updated successfully!');
    } else {
      // Create a new note
      dispatch(createNote({
        title,
        content,
        createdAt: currentTimestamp, // Set the createdAt timestamp for new note
        updatedAt: currentTimestamp, // Set the updatedAt timestamp for new note
      }));
      toast.success('Note created successfully!');
    }

    navigate('/notes'); // Navigate back to the list of notes
  };

  // Format the timestamp to a human-readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the format here
  };

  return (
    <div className='bg-gray-200 min-h-screen' style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
      }}>

    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your note..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-60 mt-4"
        />

        {/* Show created and updated timestamps */}
        <div className="mt-4 text-gray-700">
          {createdAt && (
            <div>
              <strong>Created At:</strong> {formatDate(createdAt)}
            </div>
          )}
          {updatedAt && (
            <div>
              <strong>Last Updated:</strong> {formatDate(updatedAt)}
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-md mt-6">
          <h4 className="text-lg font-semibold">Preview:</h4>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            {id ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default NoteEditor;
