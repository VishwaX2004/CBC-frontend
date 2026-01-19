import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function ContactUS() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // ===============================
  // Get logged-in user's info from JWT token
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to send a message");
      return;
    }

    try {
      const decoded = jwtDecode(token); // decode JWT
      if (decoded) {
        if (decoded.email) setUserEmail(decoded.email);
        if (decoded.name) setName(decoded.name); // auto-fill name
      } else {
        toast.error("Invalid token. Please login again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid token. Please login again.");
    }
  }, []);

  // ===============================
  // Submit form
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message) {
      toast.error("Please fill all fields");
      return;
    }

    if (!userEmail) {
      toast.error("User not logged in");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/contact",
        { name, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      toast.success(res.data.message || "Message sent successfully!");
      setMessage(""); // clear only the message
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] mt-12 lg:mt-20 bg-primary text-text px-6 py-16">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent mb-4">
            Get in Touch
          </h1>
          <p className="text-text opacity-90 leading-relaxed text-lg">
            We’d love to hear from you! Whether you have a question about our
            products, need support, or just want to say hi, we’re here to help.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-accent font-bold">📧</span>
              <span className="text-text">vishwapramuditha505@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-accent font-bold">📞</span>
              <span className="text-text">+94 71 432 8137</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-accent font-bold">📍</span>
              <span className="text-text">Nittambuwa, Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-4 lg:mt-10"
        >
          <h2 className="text-2xl font-bold text-accent mb-4 text-center">
            Send Us a Message
          </h2>

          {/* Auto-filled Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading || !userEmail}
            className={`w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition ${!userEmail ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
