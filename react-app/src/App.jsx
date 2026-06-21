import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AuthProvider } from './context/AuthContext';
// Import pages (we will make these next)
import Landing from './pages/Landing';
import Calendar from './pages/Calendar';
import Events from './pages/Events';
import EventRegistration from './pages/EventRegistration';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import UserProfile from './pages/UserProfile';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/register/:id" element={<EventRegistration />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
