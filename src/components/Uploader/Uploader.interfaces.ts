import { FormikHelpers } from "formik";
import { ReactNode } from "react";
import { Mask } from "react-text-mask";
import { SemanticWIDTHS, StrictInputProps } from "semantic-ui-react";

export interface InputInterface extends StrictInputProps {
  name: string,
  placeholder?: string,
  onBlur?(event: React.FormEvent<HTMLInputElement>, formik?: FormikHelpers<any>): void,
  onChange?(event: React.FormEvent<HTMLInputElement>): void,
  type?: string,
  mask?: Mask,
  as?: any,
  value?: string | string[] | number,
  label?: string,
  children?: ReactNode,
  className?: string,
  width?: SemanticWIDTHS,
  maxLength?: number,
  currency?: boolean,
  autoFocus?: boolean,
}
