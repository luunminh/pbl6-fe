export enum CategoryFormFields {
  CATEGORY_NAME = 'categoryName',
  DESCRIPTION = 'description',
}

export type CategoryFormFieldsType = {
  [CategoryFormFields.CATEGORY_NAME]: string;
  [CategoryFormFields.DESCRIPTION]: string;
};
