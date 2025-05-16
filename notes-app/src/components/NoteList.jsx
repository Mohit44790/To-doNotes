import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from '../redux/notesSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const NotesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const [searchTerm, setSearchTerm] = useState('');  // State for search term

  // Fetch notes on component mount
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // Delete note handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id))
        .then(() => {
          toast.success('Note deleted successfully!');
        })
        .catch(() => {
          toast.error('Failed to delete the note. Please try again.');
        });
    }
  };

  // Update note handler
  const handleUpdate = (id) => {
    navigate(`/notes/edit/${id}`);
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(); // You can format this to your preference
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter notes by title or content based on the search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort notes by last updated time
  const sortedNotes = filteredNotes.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt); // Sort in descending order
  });

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div 
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1527345931282-806d3b11967f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        minHeight: '100vh', 
        overflow: 'hidden', 
      }}
    >
      <div className="p-6 space-y-1 bg-opacity-50 bg-black rounded-md">
        <div className="flex justify-between items-center">
          <Link to={"/"}><h2 className="text-4xl font-semibold text-white">Notes</h2></Link>  
          <Link
            to="/notes/create"
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
          >
            Create Notes
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search notes by title or content..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {typeof error === 'string' ? error : error?.message || "An unknown error occurred."}
          </div>
        )}

        {sortedNotes.length === 0 ? (
          <div className="text-center text-white text-gray-700 text-lg">No notes available</div>
        ) : (
          sortedNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              <h3 className="font-semibold text-xl">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>

              {/* Display Created and Updated Times */}
              <div className="mt-2 text-sm text-gray-600">
                <div><strong>Created At:</strong> {formatDate(note.createdAt)}</div>
                <div><strong>Last Updated:</strong> {formatDate(note.updatedAt)}</div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleUpdate(note._id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
