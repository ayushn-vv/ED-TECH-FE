import * as React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Loader from 'src/components/Loader';
import { FormLabel } from '@mui/material';
import palette from 'src/theme/palette';
import Autocomplete from '../../Autocomplete';
import { isEmpty } from 'lodash';

const getLabelFromOption = (option, labelAccessor) => {
  if (Array.isArray(labelAccessor)) {
    return labelAccessor.map(key => option[key]).join(' ').toLowerCase();
  } else {
    return option[labelAccessor].toLowerCase();
  }
};
const FormAutoComplete = ({
  variant,
  data,
  label,
  register,
  control,
  setValue,
  getOptions = () => {},
  loading,
  onSearch,
  multiple,
  placeholder = "Select",
  labelProps = {},
  freeSolo = false,
  ...restProps
}) => {
  const { defaultValue,labelAccessor,valueAccessor,required } = restProps || {};

  // React.useEffect(() => {
  //   if (!isEmpty(defaultValue)) {
  //     setValue(register.name, defaultValue);
  //   }
  // }, [defaultValue, register.name, setValue]);

  const handleInputChange = React.useCallback(
    (e) => {
      onSearch(e);
    },
    [onSearch]
  );

  const handleChange = (newValue) => {
    const updatedValue = multiple
    ? newValue.map(item => {
        if (typeof item === 'string') {
          const matchingOption = data.find(
            (option) => getLabelFromOption(option, labelAccessor) === item.toLowerCase()
          );
          return matchingOption || item;
        } else {
          return item;
        }
      })
    : (typeof newValue === 'string'
        ? data.find(option => getLabelFromOption(option, labelAccessor) === newValue.toLowerCase()) || newValue
        : newValue
      );
    setValue(register.name, updatedValue,{shouldTouch:true,shouldValidate:true});
  };

  return (
    <Controller
      control={control}
      name={register.name}
      defaultValue={defaultValue || (multiple ? [] : '')}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            size="small"
            id={variant}
            options={data}
            {...field}
            onChange={handleChange}
            multiple={multiple}
            onFocus={getOptions}
            renderInput={(params) => (
              <>
                {label && (
                  <FormLabel
                  required={required?.value}
                    sx={{ fontSize: 12, lineHeight: '18px', fontWeight: 500, ...labelProps }}
                  >
                    {label}
                  </FormLabel>
                )}
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={!!error}
                  helperText={error?.message || null}
                  required={restProps?.required?.value}
                  onChange={handleInputChange}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: loading ? (
                      <Loader type="circular" size={15} loading={loading} />
                    ) : (
                      params.InputProps.endAdornment
                    ),
                  }}
                  size="small"
                />
              </>
            )}
            freeSolo={freeSolo}
            {...restProps}
            value={field.value}
            sx={{
              ...(restProps?.sx || {}),
              '& .MuiFormLabel-root': {
                fontSize: '12px',
                marginBottom: '4px',
                color: palette.text.primary,
                lineHeight: '18px',
                fontWeight: 500,
              },
              '& .MuiInputBase-root': {
                padding: '13px 12px !important',
              },
              '& .MuiTypography-root': {
                fontSize: '12px',
                color: palette.text.secondary,
                lineHeight: '18px',
                fontWeight: 400,
              },
              '& .MuiSvgIcon-root': {
                color: palette.text.offGray,
              },
              '& input::placeholder': {
                fontSize: '12px',
                color: palette.text.secondary,
                lineHeight: '18px',
                fontWeight: 400,
              },
              '& input': {
                padding: '0px !important',
              },
              '& .MuiInputBase-adornedStart': {
                padding: '10px 12px !important',
              },
              '& .Mui-selected': {
                fontWeight: 600,
                color: palette.background.main,
              },
            }}
            noOptionsText="Type to search"
            isOptionEqualToValue={(option, value) =>
              typeof value === 'string'
                ?false
                : option?.[valueAccessor] === value?.[valueAccessor]
            }
          />
        );
      }}
    />
  );
};

FormAutoComplete.defaultProps = {
  variant: 'combo-box-demo',
  data: [],
  label: '',
  register: {},
  error: '',
  getOptions: () => {},
  loading: false,
};

FormAutoComplete.propTypes = {
  variant: PropTypes.string,
  data: PropTypes.array,
  label: PropTypes.string,
  register: PropTypes.object,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  getOptions: PropTypes.func,
  loading: PropTypes.bool,
};

export default FormAutoComplete;
