import { IProductTestCase } from "data/types/product.types";
import { MANUFACTURERS } from "./manufacturers";


export const positiveTestTitles = {
  MIN_VALUES: "Создание продукта с минимальными допустимыми значениями",
  MID_VALUES: "Создание продукта со средними корректными значениями",
  MAX_VALUES: "Создание продукта с максимальными допустимыми значениями",
  NAME_WITH_DIGITS: "Создание продукта с именем, содержащим цифры и пробел",
  UNIQUE_PRODUCT: "Создание уникального продукта с заполненными всеми полями",
  EMPTY_NOTES: "Создание продукта без заметки",
  NOTES_WITH_SYMBOLS: "Создание продукта с допустимыми символами в Notes",
  DUPLICATE_NAME_DIFFERENT_MANUFACTURER: "Создание продукта с производителем XIAOMI"
};

export const positiveTestData: IProductTestCase[]   =  [
  {
    title: positiveTestTitles.MIN_VALUES,
    data: {
      name: "ABC",
      manufacturer: MANUFACTURERS.SONY,
      price: 1,
      amount: 0,
      notes: "",
    },
  },
  {
    title: positiveTestTitles.MID_VALUES,
    data: {
      name: "Smart Lamp",
      manufacturer: MANUFACTURERS.AMAZON,
      price: 500,
      amount: 250,
      notes: "Popular indoor model",
    },
  },
  {
    title: positiveTestTitles.MAX_VALUES,
    data: {
      name: "ProductName12345678901234567890123456789",
      manufacturer: MANUFACTURERS.MICROSOFT,
      price: 99999,
      amount: 999,
      notes: "A".repeat(250),
    },
  },
  {
    title: positiveTestTitles.NAME_WITH_DIGITS,
    data: {
      name: "Phone 123",
      manufacturer: MANUFACTURERS.GOOGLE,
      price: 1200,
      amount: 10,
      notes: "Top seller 2025",
    },
  },
  {
    title: positiveTestTitles.UNIQUE_PRODUCT,
    data: {
      name: "Smart Light 2000",
      manufacturer: MANUFACTURERS.APPLE,
      price: 1999,
      amount: 15,
      notes: "Energy-saving, indoor use",
    },
  },
  {
    title: positiveTestTitles.EMPTY_NOTES,
    data: {
      name: "EcoFan 10",
      manufacturer: MANUFACTURERS.SAMSUNG,
      price: 150,
      amount: 25,
      notes: "",
    },
  },
  {
    title: positiveTestTitles.NOTES_WITH_SYMBOLS,
    data: {
      name: "WaterPump300",
      manufacturer: MANUFACTURERS.TESLA,
      price: 9800,
      amount: 100,
      notes: "Durable & reliable pump!",
    },
  },
  {
    title: positiveTestTitles.DUPLICATE_NAME_DIFFERENT_MANUFACTURER,
    data: {
      name: "WaterPump301",
      manufacturer: MANUFACTURERS.XIAOMI,
      price: 9800,
      amount: 100,
      notes: "Durable & reliable pump!",
    },
  },
];

