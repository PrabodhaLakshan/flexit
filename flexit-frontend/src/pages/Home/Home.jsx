import Footer from '../../components/footer/footer';
import Header from '../../components/Header/header';
import './Home.css';

function Home() {
  return (
    <div className="landing-page">
      <Header />

      <main className="landing-main">
        <section className="hero-section">
          <p className="hero-tag">Smart Resource Management Platform</p>
          <h1>Book Campus Resources and Raise Tickets from One Place</h1>
          <p className="hero-subtext">
            This system allows students and staff to book campus resources such as lecture halls, labs,
            meeting rooms, and equipment. If any resource is damaged or has an issue, users can quickly
            raise a support ticket and track updates until resolution.
          </p>
        </section>

        <section id="about-us" className="about-section">
          <h2>About Us</h2>
          <p>
            Flexit is built for campus operations where multiple resources are shared by many users.
            We simplify booking workflows, reduce scheduling conflicts, and provide a reliable way to
            report and resolve maintenance or service issues through a ticketing flow.
          </p>
          <div className="about-grid">
            <article>
              <h3>Mission</h3>
              <p>Deliver transparent and dependable resource management for every team.</p>
            </article>
            <article>
              <h3>Vision</h3>
              <p>Create a system where requests, approvals, and operations move without delays.</p>
            </article>
            <article>
              <h3>Value</h3>
              <p>Speed, clarity, and accountability across all facility and technical processes.</p>
            </article>
          </div>
        </section>
      </main>

      <div id="contact-us">
        <Footer />
      </div>
    </div>
  );
}

export default Home;