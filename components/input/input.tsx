import {
  ChangeEventHandler,
  HTMLAttributes,
  HTMLInputTypeAttribute,
} from "react";

interface IInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  label?: string;
  isHiddenLabel?: boolean;
  styleLabel?: HTMLAttributes<HTMLLabelElement>;
  styleInput?: HTMLAttributes<HTMLInputElement>;
  showError?: boolean;
  contentError?: string;
  disabled?: boolean;
  checked?: boolean
}

const InputSection = (props: IInputProps) => {
  return (
    <div>
      {!props.isHiddenLabel ? (
        <label
          style={props.styleLabel}
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      ) : null}
      <input
        disabled={props.disabled}
        type={props.type}
        name={props.name}
        id={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={props.placeholder}
        required={props.required}
        style={props.styleInput}
        value={props?.value}
        onChange={props.onChange}
        checked={!!props.checked}
      />

      {props?.showError && (
        <div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {props.contentError}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputSection;
