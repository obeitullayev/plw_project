import { MANUFACTURERS } from "./manufacturers";
import { IProductTestCase } from "./positiveTestDataAPI";

export const negativeTestTitles = {
  NAME_EMPTY: "Попытка создать продукт с пустым именем",
  NAME_TOO_SHORT: "Имя продукта короче 3 символов",
  NAME_TOO_LONG: "Имя продукта длиннее 40 символов",
  NAME_INVALID_CHARS: "Имя продукта содержит недопустимые символы",
  MANUFACTURER_EMPTY: "Попытка создать продукт без производителя",
  PRICE_ZERO: "Цена продукта равна 0",
  PRICE_TOO_HIGH: "Цена продукта больше 99999",
  AMOUNT_NEGATIVE: "Количество меньше 0",
  AMOUNT_TOO_HIGH: "Количество больше 999",
  NOTES_TOO_LONG: "Notes превышает 250 символов",
  NOTES_INVALID_CHARS: "Notes содержит запрещённые символы < или >",
};

export const negativeTestData: IProductTestCase[] = [
  {
    title: negativeTestTitles.NAME_EMPTY,
    data: {
      name: "",
      manufacturer: MANUFACTURERS.SONY,
      price: 100,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.NAME_TOO_SHORT,
    data: {
      name: "AB",
      manufacturer: MANUFACTURERS.AMAZON,
      price: 100,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.NAME_TOO_LONG,
    data: {
      name: "A".repeat(41),
      manufacturer: MANUFACTURERS.MICROSOFT,
      price: 100,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.NAME_INVALID_CHARS,
    data: {
      name: "Phone@123",
      manufacturer: MANUFACTURERS.GOOGLE,
      price: 100,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.MANUFACTURER_EMPTY,
    data: {
      name: "Valid Name",
      manufacturer: "" as unknown as MANUFACTURERS,
      price: 100,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.PRICE_ZERO,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.APPLE,
      price: 0,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.PRICE_TOO_HIGH,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.SAMSUNG,
      price: 100000,
      amount: 10,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.AMOUNT_NEGATIVE,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.TESLA,
      price: 100,
      amount: -1,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.AMOUNT_TOO_HIGH,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.XIAOMI,
      price: 100,
      amount: 1000,
      notes: "Valid notes",
    },
  },
  {
    title: negativeTestTitles.NOTES_TOO_LONG,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.SONY,
      price: 100,
      amount: 10,
      notes: "A".repeat(251),
    },
  },
  {
    title: negativeTestTitles.NOTES_INVALID_CHARS,
    data: {
      name: "Valid Name",
      manufacturer: MANUFACTURERS.AMAZON,
      price: 100,
      amount: 10,
      notes: "Invalid <notes>",
    },
  },
];
