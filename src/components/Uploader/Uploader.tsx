import { ErrorMessage, Field } from 'formik';
import { isNil } from 'lodash/fp';
import React from 'react';
import { Input, Form } from 'semantic-ui-react';
import { InputInterface } from './Uploader.interfaces';

const Uploader = ({ name, placeholder, onBlur, label, className, width, maxLength, autoFocus, disabled }: InputInterface) => (
  <Field name={name}>
    {({ field, form }: any) => {
      const { errors, setFieldTouched, setFieldValue } = form;

      const onChange = (event: any) => setFieldValue(field.name, event.target.files[0]);

      const onBlurEvent = (event: React.FormEvent<HTMLInputElement>) => {
        // eslint-disable-next-line no-unused-expressions
        onBlur && onBlur(event);
        setFieldTouched(name, true, true);
      };

      return (
        <Form.Field error={!isNil(errors[name])} width={width}>
          {label && <label htmlFor={name}>{label}</label>}
          <Input
            autoFocus={autoFocus}
            name={name}
            type="file"
            onChange={onChange}
            onBlur={onBlurEvent}
            className={className}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
          />
          {errors[name] && <ErrorMessage name={name} />}
        </Form.Field>
      );
    }}
  </Field>
);

export default Uploader;
