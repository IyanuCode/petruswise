"use client";
// Ensures this component runs on the client side (not server-rendered) in Next.js 13+ App Router

import { useParams } from "next/navigation"; // Hook for accessing dynamic route parameters (e.g., /page/[id])
import { useEffect, useState } from "react"; // React hooks for state management and side effects
import toast from "react-hot-toast"; // Lightweight library for showing toast notifications
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function PageEditor() {
  // Get the dynamic 'id' parameter from the URL
  const { id } = useParams();

  // State variables for the page data
  const [title, setTitle] = useState(""); // Holds the page title
  const [content, setContent] = useState(""); // Holds the page content (editable)
  const [loading, setLoading] = useState(true); // Tracks whether the page is still loading data

  /**
   * Fetch the page data when the component first loads
   * or when the 'id' in the URL changes.
   */
  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`/api/page-content/${id}`); // GET request to fetch the page content
        if (!res.ok) throw new Error("Failed to load page data");

        const data = await res.json(); // Parse JSON response
        setTitle(data.title); // Update the title state
        setContent(data.content); // Update the content state
      } catch (error) {
        console.error(error);
        toast.error("Error loading page data."); // Show error notification
      } finally {
        setLoading(false); // Stop loading spinner regardless of success or failure
      }
    }

    loadPage(); // Invoke the async function
  }, [id]); // Re-run effect when the 'id' changes

  /**
   * Handle saving page updates to the server.
   * Sends a PUT request to update the page content.
   */
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/page-content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }), // Send updated content
      });

      if (res.ok) toast.success("Page Updated"); // Success feedback
      else toast.error("Error saving changes."); // Failure feedback
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred."); // Network or other error
    }
  };

  // Show a loading indicator while fetching data
  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* Page header */}
      <h1 className="text-2xl font-semibold text-[var(--heading)] mb-4">
        Edit Page: {title}
      </h1>

      {/* Editable text area for the page content */}
      <ReactQuill
        value={content}
        onChange={setContent}
        className="bg-white text-black mb-4"
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        className="mt-4 bg-[var(--heading)] text-white px-4 py-2 rounded hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}
