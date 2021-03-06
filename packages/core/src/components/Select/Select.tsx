/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';

import {
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Chip,
  Typography,
  Checkbox,
  ClickAwayListener,
} from '@material-ui/core';

import ClosedDropdown from './static/ClosedDropdown';
import OpenedDropdown from './static/OpenedDropdown';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'Helvetica Neue',
      '&:focus': {
        background: theme.palette.background.paper,
        borderRadius: 4,
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: `${theme.spacing(1)} 0px`,
      maxWidth: 300,
    },
    label: {
      transform: 'initial',
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    checkbox: {},
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

type Item = {
  label: string;
  value: string | number;
};

export type SelectProps = {
  multiple?: boolean;
  items: Item[];
  label: string;
  placeholder?: string;
  onChange: (arg: any) => any;
  triggerReset?: boolean;
};

export const SelectComponent = (props: SelectProps) => {
  const { multiple, items, label, placeholder, onChange } = props;
  const classes = useStyles();
  const [value, setValue] = useState<any[] | string | number>(
    multiple ? [] : '',
  );
  const [canOpen, setCanOpen] = React.useState(false);

  useEffect(() => {
    setValue(multiple ? [] : '');
  }, [props.triggerReset, multiple]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as any);
    onChange(event.target.value);
  };

  const selectHandleOnOpen = () => {
    setCanOpen(previous => {
      if (multiple) {
        return true;
      }
      return !previous;
    });
  };

  const handleClickAway = (event: React.ChangeEvent<any>) => {
    if (event.target.id !== 'menu-item') {
      setCanOpen(false);
    }
  };

  const handleDelete = (selectedValue: string | number) => () => {
    const newValue = (value as any[]).filter(chip => chip !== selectedValue);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="button">{label}</Typography>
      <ClickAwayListener onClickAway={handleClickAway}>
        <FormControl className={classes.formControl}>
          <Select
            value={value}
            data-testid="select"
            displayEmpty
            multiple={multiple}
            onChange={handleChange}
            onClick={selectHandleOnOpen}
            open={canOpen}
            input={<BootstrapInput />}
            renderValue={selected =>
              multiple && (value as any[]).length !== 0 ? (
                <div className={classes.chips}>
                  {(selected as string[]).map(selectedValue => (
                    <Chip
                      key={items.find(el => el.value === selectedValue)?.value}
                      label={
                        items.find(el => el.value === selectedValue)?.label
                      }
                      clickable
                      onDelete={handleDelete(selectedValue)}
                      className={classes.chip}
                    />
                  ))}
                </div>
              ) : (
                <Typography>
                  {(value as any[]).length === 0
                    ? placeholder || ''
                    : items.find(el => el.value === selected)?.label}
                </Typography>
              )
            }
            IconComponent={() =>
              !canOpen ? <ClosedDropdown /> : <OpenedDropdown />
            }
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
          >
            {placeholder && !multiple && (
              <MenuItem value={[]}>{placeholder}</MenuItem>
            )}
            {items &&
              items.map(item => (
                <MenuItem id="menu-item" key={item.value} value={item.value}>
                  {multiple && (
                    <Checkbox
                      color="primary"
                      checked={(value as any[]).includes(item.value) || false}
                      className={classes.checkbox}
                    />
                  )}
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </ClickAwayListener>
    </div>
  );
};
