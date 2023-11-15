export enum PRODUCT_FILTER_QUERY_KEY {
  Categories = 'categories',
  StoreId = 'storeId',
}

export enum PRODUCT_FORM_KEY {
  id = 'id',
  name = 'name',
  description = 'description',
  price = 'price',
  categoryId = 'categoryId',
  image = 'image',
}

export const filterParamsKey = [
  PRODUCT_FILTER_QUERY_KEY.Categories,
  PRODUCT_FILTER_QUERY_KEY.StoreId,
];

export type ProductFilterFormValue = {
  categories: string[];
  storeId: string;
};

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = event;
  const regex = /^[0-9\b]+$/;
  switch (key) {
    case 'ArrowLeft':
      break;
    case 'ArrowRight':
      break;
    case 'Delete':
      break;
    case 'Backspace':
      break;
    default:
      if (!regex.test(key)) {
        event.preventDefault();
      }
      break;
  }
};
