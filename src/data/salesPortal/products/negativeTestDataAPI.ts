import { generateProductData } from "./generateProductData";
import { MANUFACTURERS } from "./manufacturers";
import { IProductTestCase } from "data/types/product.types";

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
    data: generateProductData({ name: "" }),
  },
  {
    title: negativeTestTitles.NAME_TOO_SHORT,
    data: generateProductData({ name: "AB" }),
  },
  {
    title: negativeTestTitles.NAME_TOO_LONG,
    data: generateProductData({ name: "A".repeat(41) }),
  },
  {
    title: negativeTestTitles.NAME_INVALID_CHARS,
    data: generateProductData({ name: "Phone@123" }),
  },
  {
    title: negativeTestTitles.MANUFACTURER_EMPTY,
    data: generateProductData({  manufacturer: "" as unknown as MANUFACTURERS }),
  },
  {
    title: negativeTestTitles.PRICE_ZERO,
    data: generateProductData({ price: 0 })
  },
 {
  title: negativeTestTitles.PRICE_TOO_HIGH,
  data: generateProductData({ price: 100000 }),
  },
  {
    title: negativeTestTitles.AMOUNT_NEGATIVE,
    data: generateProductData({ amount: -1 }),
  },
  {
    title: negativeTestTitles.AMOUNT_TOO_HIGH,
    data: generateProductData({ amount: 1000 }),
  },
  {
    title: negativeTestTitles.NOTES_TOO_LONG,
    data: generateProductData({ notes: "A".repeat(251) }),
  },
  {
    title: negativeTestTitles.NOTES_INVALID_CHARS,
    data: generateProductData({ notes: "Invalid <notes>" }),
  },
];
