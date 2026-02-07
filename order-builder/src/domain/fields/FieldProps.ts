export interface BaseFieldProps {
  label: string;
  required: boolean;
}

export interface TextFieldProps extends BaseFieldProps {
  placeholder?: string;
  maxLength?: number;
}

export interface NumberFieldProps extends BaseFieldProps {
  min?: number;
  max?: number;
}

export interface DateFieldProps extends BaseFieldProps {
  minDate?: string;
  maxDate?: string;
}

export interface SelectFieldProps extends BaseFieldProps {
  options: {
    value: string;
    label: string;
  }[];
}