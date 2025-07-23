'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ratingSchema, RatingFormData } from "@/validations/ratingSchema/ratingSchema";

export type RatingContextType = ReturnType<typeof useForm<RatingFormData>> & {
  consultaData: (RatingFormData & { timestamp: Date }) | null;
  onSubmit: (data: RatingFormData) => void;
};

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [consultaData, setConsultaData] = useState<(RatingFormData & { timestamp: Date }) | null>(null);
  const methods = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      personType: undefined, // Nenhum valor selecionado por padrão
      document: "",
      newConsultation: false
    }
  });
  
  const onSubmit = (data: RatingFormData) => {
    console.log("Dados válidos:", data);
    setConsultaData({ ...data, timestamp: new Date() });
  };

  // Desabilita o campo de documento até selecionar o tipo de pessoa
  const personType = methods.watch("personType");
  useEffect(() => {
    if (!personType) {
      methods.setValue("document", "");
    }
  }, [personType, methods]);

  return (
    <RatingContext.Provider value={{ ...methods, consultaData, onSubmit }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}