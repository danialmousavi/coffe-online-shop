import React from "react";

const MoreInfoes = ({ weight, suitableFor, smell }) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{weight} گرم</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب</p>
          <p>{suitableFor}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>بو</p>
          <p>{smell}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
