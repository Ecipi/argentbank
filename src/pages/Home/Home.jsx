import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import iconChat from "../../assets/img/icon-chat.avif";
import iconMoney from "../../assets/img/icon-money.avif";
import iconSecurity from "../../assets/img/icon-security.avif";
import FeatureItem from "../../components/FeatureItem/FeatureItem";
import featuresData from "../../data/features.json";
import "./Home.css";

const Home = () => {
  const iconMap = {
    chat: iconChat,
    money: iconMoney,
    security: iconSecurity,
  };

  return (
    <>
      <Header />

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featuresData.features.map((feature) => (
            <FeatureItem key={feature.id} icon={iconMap[feature.id]} alt={feature.alt} title={feature.title} description={feature.description} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
