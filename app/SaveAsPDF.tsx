"use client";

export const SaveAsPDF = () => {
  const saveAsPDF = () => {
    window.print();
  };
  return <button onClick={saveAsPDF}>Сохранить как PDF</button>;
};
