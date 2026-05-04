export default function App() {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      fontFamily: "Arial",
      background: "#f8efe9",
      minHeight: "100vh"
    }}>
      
      <h1 style={{fontSize: "40px"}}>
        Julia Duarte Beauty Studio
      </h1>

      <p style={{fontSize: "18px"}}>
        Beleza, sofisticação e cuidado em cada detalhe
      </p>

      <a 
        href="https://wa.me/5511933605983"
        target="_blank"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "15px 25px",
          background: "#d8a29a",
          color: "white",
          textDecoration: "none",
          borderRadius: "30px",
          fontWeight: "bold"
        }}
      >
        Agendar pelo WhatsApp
      </a>

      <p style={{marginTop: "40px"}}>
        Instagram: @juduartebeautystudio
      </p>

    </div>
  );
}
