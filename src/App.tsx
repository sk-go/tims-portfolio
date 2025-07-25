import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', padding: '20px', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Herzlichen Glückwunsch zum 27ten, Eggo!</h1>
        <p style={{ fontSize: '1.25rem' }}>Deine eigene Domain – powered by Sasho. Insta ist out. Hier kannst du deinen Lebenslauf und deine Projekte teilen.</p>
        <p>Dein Birthday Track: </p>
        <p><audio controls src="/0.mp4" /></p>
      </header>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Über Tim</h2>
        <img src="tim_portrait3.png" alt="Tim Eggert Portrait" style={{ maxWidth: '300px', borderRadius: '10px', marginBottom: '20px' }} />
        <p>Hi, ich bin Tim, ich höre gern Musik (alles von Alessia Cara, über Eminem bis Sam Smith) und spiele alle möglichen online und offline Games. Ich bin ein großer Fan von Harry Potter und Suits. Außerdem habe schon 1000x im Quizduell gewonnen und den Freund deines Freundes deines Freundes durch eine Wette ärmer gemacht. </p>
        <p>Spitznamen: Eggi, Eggo, Eggbert, Eggobertus, Eggobertus Dactylus, Eggo Fresh, "Tim"</p>
      </section>
      
      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Mein steiler (und geiler) Start</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Projekt -1: Abitur am Humbold Gymansium Cottbus, Schnitt 1.0</li>
          <li>Projekt 0: Ausbildung zum Industriekaufmann, Schnitt 1.0</li>
          <li>Projekt 1: Bachelor of Science in Business Administration, Schnitt 1.3</li>
          <li>Projekt 2: CFO bei KI-AGENTEN für Dich und Mich (Work in Progress)</li>
        </ul>
      </section>
      


      <section style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'semibold', marginBottom: '20px' }}>Eggos Bloggo</h2>
        <p>Erster Post: Danke für die Domain! Lass was draus machen.</p>
        <Link to="/blog" style={{ color: 'blue', textDecoration: 'underline' }}>Zum Bloggo</Link>
      </section>
      
      <footer style={{ marginTop: '40px' }}>
        <p>Sasho – 2025</p>
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