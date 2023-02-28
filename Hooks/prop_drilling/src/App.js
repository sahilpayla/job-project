import './App.css';
import ChildA from './ChildA';

const style = {
  color: "white",
  textAlign: "center",
  padding: "40px 0",
  backgroundColor: "olive",
}
const inputStyle = {
  textAlign: "center",
  fontSize: "40px",
  margin: "40px auto",
  width: "100%",
  border: "none",
  outline: "none"
}
const buttonStyle = {
  textAlign: "center",
  fontSize: "15px",
  padding: "20px 50px",
  border: "none",
  marginRight: "10px",
  borderRadius: "20px",
  cursor: "pointer"
}


function App() {
  const name = "sahil"
  return (
    <>
      <h1 style={style}>Prop Drilling</h1>
      <ChildA name={name} />
    </>
  );
}

export default App;