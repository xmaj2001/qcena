export type FormattedError = {
  field: string;
  errors: string[];
};

export type FormattedValidationErros = {
  message: string;
  errors: FormattedError[];
};
