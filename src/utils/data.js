export default function noteAPI() {
  const baseUrl = 'https://notes-api.dicoding.dev/v2';
  const getNotes = async () => {
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      return [];
    }
  };
  const getArchivedNotes = async () => {
    try {
      const response = await fetch(`${baseUrl}/notes/archived`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      return [];
    }
  };
  const getSingleNote = async (note_id) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${note_id}`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      return [];
    }
  };
  const createNote = async (note) => {
    try {
      const response = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      const json = await response.json();
    } catch (error) {
      return null;
    }
  };
  const archiveNote = async (note_id) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${note_id}/archive`, {
        method: 'POST',
      });
      const json = await response.json();
      return json.data;
    } catch (error) {
      return null;
    }
  };
  const unarchiveNote = async (note_id) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${note_id}/unarchive`, {
        method: 'POST',
      });
      const json = await response.json();
      return json.data;
    } catch (error) {
      return null;
    }
  };

  const deleteNote = async (note_id) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${note_id}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      return json.data;
    } catch (error) {
      return null;
    }
  };

  return {
    getNotes,
    getArchivedNotes,
    getSingleNote,
    createNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
  };
}
