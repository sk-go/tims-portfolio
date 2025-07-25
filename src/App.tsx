import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface GuestbookMessage {
  name: string;
  message: string;
}

function Home() {
  const [guestbookMessages, setGuestbookMessages] = useState<GuestbookMessage[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Load messages from server
  useEffect(() => {
    fetch('/api/messages')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setGuestbookMessages(data);
        } else {
          console.error('Invalid data format:', data);
          // Fallback to localStorage or default messages
          const saved = localStorage.getItem('guestbookMessages');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed)) {
                setGuestbookMessages(parsed);
              } else {
                throw new Error('Invalid localStorage data');
              }
            } catch (e) {
              setGuestbookMessages([
                { name: 'Sasho', message: 'Alles Gute zum Geburtstag, Eggo! 🎉' },
                { name: 'Anonym', message: 'Happy Birthday! Hoffe du hast einen tollen Tag! 🎂' }
              ]);
            }
          } else {
            setGuestbookMessages([
              { name: 'Sasho', message: 'Alles Gute zum Geburtstag, Eggo! 🎉' },
              { name: 'Anonym', message: 'Happy Birthday! Hoffe du hast einen tollen Tag! 🎂' }
            ]);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading messages:', error);
        // Fallback to localStorage or default messages
        const saved = localStorage.getItem('guestbookMessages');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setGuestbookMessages(parsed);
            } else {
              throw new Error('Invalid localStorage data');
            }
          } catch (e) {
            setGuestbookMessages([
              { name: 'Sasho', message: 'Alles Gute zum Geburtstag, Eggo! 🎉' },
              { name: 'Anonym', message: 'Happy Birthday! Hoffe du hast einen tollen Tag! 🎂' }
            ]);
          }
        } else {
          setGuestbookMessages([
            { name: 'Sasho', message: 'Alles Gute zum Geburtstag, Eggo! 🎉' },
            { name: 'Anonym', message: 'Happy Birthday! Hoffe du hast einen tollen Tag! 🎂' }
          ]);
        }
        setLoading(false);
      });
  }, []);

  const handleSubmitMessage = async () => {
    if (newName.trim() && newMessage.trim()) {
      const newMsg = { name: newName, message: newMessage };
      
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMsg),
        });

        if (response.ok) {
          const savedMsg = await response.json();
          setGuestbookMessages([...guestbookMessages, savedMsg]);
        } else {
          console.error('Failed to save message to server, using localStorage fallback');
          // Fallback to localStorage
          const updatedMessages = [...guestbookMessages, newMsg];
          setGuestbookMessages(updatedMessages);
          localStorage.setItem('guestbookMessages', JSON.stringify(updatedMessages));
        }
        
        setNewName('');
        setNewMessage('');
      } catch (error) {
        console.error('Error saving message:', error);
        // Fallback to localStorage
        const updatedMessages = [...guestbookMessages, newMsg];
        setGuestbookMessages(updatedMessages);
        localStorage.setItem('guestbookMessages', JSON.stringify(updatedMessages));
        setNewName('');
        setNewMessage('');
      }
    }
  };
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', padding: '20px', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Herzlichen Glückwunsch zum 27ten, Eggo!</h1>
        <p style={{ fontSize: '1.25rem' }}>Deine eigene Domain – powered by Sasho. Insta ist out. Hier kannst du dein Lebenslauf und deine Projekte teilen.</p>
      </header>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Über Tim Eggert</h2>
        <img src="tim_portrait2.png" alt="Tim Eggert Portrait" style={{ maxWidth: '300px', borderRadius: '10px', marginBottom: '20px' }} />
        <p>Hi, ich bin Tim, ich höre gern Musik (alles von Alessia Cara, über Eminem bis Sam Smith) und spiele alle möglichen online und offline Games. Ich bin ein großer Fan von Harry Potte und Suits. Außerdem habe schon 1000x im Quizduell gewonnen und den Freund deines Freundes deines Freundes durch eine Wette ärmer gemacht. </p>
      </section>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Mein Portfolio</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Projekt 1: KI-AGENTEN die Dich und deine Mutter arbeitslos machen werden</li>
          <li>Projekt 2: Deine Mutter</li>
        </ul>
      </section>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Eggos Bloggo</h2>
        <p>Erster Post: Danke für die Domain! Lass was draus machen.</p>
        <Link to="/blog" style={{ color: 'blue', textDecoration: 'underline' }}>Zum Bloggo</Link>
      </section>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Gästebuch</h2>
        <p style={{ marginBottom: '20px' }}>Hinterlass eine Nachricht für Tim!</p>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <input 
            type="text"
            placeholder="Dein Name..." 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: 'black',
              color: 'white',
              fontSize: '14px',
              marginBottom: '10px'
            }}
          />
          <textarea 
            placeholder="Schreib hier deine Nachricht..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ 
              width: '100%', 
              minHeight: '100px', 
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: 'black',
              color: 'white',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
          <button 
            onClick={handleSubmitMessage}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Nachricht senden
          </button>
        </div>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          padding: '20px', 
          borderRadius: '10px',
          textAlign: 'left'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#fff' }}>Bisherige Nachrichten:</h3>
          {loading ? (
            <p style={{ color: '#ccc' }}>Lade Nachrichten...</p>
          ) : (
            guestbookMessages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}>
                <strong style={{ color: '#fff' }}>{msg.name}:</strong> 
                <p style={{ margin: '5px 0 0 0', color: '#ccc' }}>{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
      
      <footer style={{ marginTop: '40px' }}>
        <p>Birthday Track: </p>
        <p><audio controls src="/0.mp4" /></p>
        <p>Geschenkt von Sasho – 2025</p>
      </footer>
    </div>
  );
}

function Blog() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem' }}>Eggos Bloggo</h1>
      <p>Hier kannst du Posts hinzufügen. Erster Eintrag: Alles Gute zum Geburtstag!</p>
      <Link to="/">Zurück zur Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;