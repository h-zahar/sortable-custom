const Box = ({ id }: { id: number }) => {
  return (
    <div
      id={id.toString()}
      style={{
        width: 300,
        height: 70,
        marginBottom: 30,
        background: "lightblue",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ height: 70, width: 30, border: "1px solid blue" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {id}
        </div>
      </div>
    </div>
  );
};

export default Box;
