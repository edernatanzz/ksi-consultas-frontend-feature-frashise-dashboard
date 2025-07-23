import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const ratingSchema = z.object({
  personType: z.enum(["", "fisica", "juridica"]),
  document: z.string().min(1, "Campo obrigatório"),
  newConsultation: z.boolean().optional()
}).superRefine((data, ctx) => {
  if (data.personType === "fisica" && !cpfRegex.test(data.document)) {
    ctx.addIssue({
      path: ["document"],
      code: z.ZodIssueCode.custom,
      message: "CPF inválido (formato: 000.000.000-00)"
    });
  }
  if (data.personType === "juridica" && !cnpjRegex.test(data.document)) {
    ctx.addIssue({
      path: ["document"],
      code: z.ZodIssueCode.custom,
      message: "CNPJ inválido (formato: 00.000.000/0000-00)"
    });
  }
});

export type RatingFormData = z.infer<typeof ratingSchema>;