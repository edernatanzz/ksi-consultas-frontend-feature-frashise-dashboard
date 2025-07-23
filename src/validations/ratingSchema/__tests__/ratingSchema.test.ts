import { describe, expect, it } from "vitest";
import { ratingSchema } from "../ratingSchema";

describe("ratingSchema", () => {
  describe("When validating personType", () => {
    it("then should accept 'fisica' as valid", () => {
      // Arrange
      const validData = {
        personType: "fisica",
        document: "123.456.789-09",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should accept 'juridica' as valid", () => {
      // Arrange
      const validData = {
        personType: "juridica",
        document: "12.345.678/0001-95",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should accept empty string as valid", () => {
      // Arrange
      const validData = {
        personType: "",
        document: "any",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should reject invalid personType", () => {
        // Arrange
        const invalidData = {
            personType: "invalid",
            document: "any",
        };

        // Act
        const result = ratingSchema.safeParse(invalidData);

        // Assert
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Invalid enum value");
            expect(result.error.issues[0].message).toContain("received 'invalid'");
        }
    });
  });

  describe("When validating document", () => {
    it("then should require document field", () => {
      // Arrange
      const invalidData = {
        personType: "fisica",
        document: "",
      };

      // Act
      const result = ratingSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Campo obrigatório");
      }
    });

    it("then should validate CPF format for 'fisica'", () => {
      // Arrange
      const invalidData = {
        personType: "fisica",
        document: "12345678909", // formato inválido
      };

      // Act
      const result = ratingSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "CPF inválido (formato: 000.000.000-00)"
        );
      }
    });

    it("then should accept valid CPF format for 'fisica'", () => {
      // Arrange
      const validData = {
        personType: "fisica",
        document: "123.456.789-09",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should validate CNPJ format for 'juridica'", () => {
      // Arrange
      const invalidData = {
        personType: "juridica",
        document: "12345678000195", // formato inválido
      };

      // Act
      const result = ratingSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "CNPJ inválido (formato: 00.000.000/0000-00)"
        );
      }
    });

    it("then should accept valid CNPJ format for 'juridica'", () => {
      // Arrange
      const validData = {
        personType: "juridica",
        document: "12.345.678/0001-95",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("When validating newConsultation", () => {
    it("then should accept undefined newConsultation", () => {
      // Arrange
      const validData = {
        personType: "fisica",
        document: "123.456.789-09",
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should accept true for newConsultation", () => {
      // Arrange
      const validData = {
        personType: "fisica",
        document: "123.456.789-09",
        newConsultation: true,
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should accept false for newConsultation", () => {
      // Arrange
      const validData = {
        personType: "fisica",
        document: "123.456.789-09",
        newConsultation: false,
      };

      // Act
      const result = ratingSchema.safeParse(validData);

      // Assert
      expect(result.success).toBe(true);
    });

    it("then should reject non-boolean newConsultation", () => {
      // Arrange
      const invalidData = {
        personType: "fisica",
        document: "123.456.789-09",
        newConsultation: "not-a-boolean",
      };

      // Act
      const result = ratingSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
    });
  });
});