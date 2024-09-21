"use client";

import { Button } from "@/components/ui/button";

export const SaveAsPDF = () => {
  const saveAsPDFHandler = () => {
    window.print();
  };

  return (
    <Button type="button" className="w-full" onClick={saveAsPDFHandler}>
      Сохранить как PDF
    </Button>
  );
};
