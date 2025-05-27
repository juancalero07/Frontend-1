import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <br />
      <div className="graph-container">
        <Card style={{ height: 600 }}>
          <iframe
            title="PRACTICA BI2(JUAN)"
            width="1297"
            height="500"
            src="https://app.powerbi.com/view?r=eyJrIjoiZGRmMDBhNmQtODgzZS00OGMwLTg4M2YtM2EzMDU0OTUxNzhkIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
            frameBorder="0"
            allowFullScreen="true"
          ></iframe>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;