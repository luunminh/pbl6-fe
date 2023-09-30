import React, { ChangeEvent, useState } from 'react';
import {
  Stack,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  InputBase,
  TextField,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

type PropsType = {
  handleClose: () => void;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '6px',
      border: '1.5px solid #c4cad1',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '& input': {
      fontSize: '14px',
      color: '#484c4f',
    },
    '&:hover fieldset': {
      borderColor: '#91979e',
    },
    '&.Mui-focused': {
      '& fieldset': {
        borderColor: '#74b8f0',
        boxShadow: `${alpha('#74b8f0', 0.25)} 0 0 0 2.5px`,
      },
    },
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '6px',
    position: 'relative',
    border: '1.5px solid #c4cad1',
    fontSize: '14px',
    color: '#484c4f',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: '#91979e',
    },
    '&:focus': {
      borderColor: '#74b8f0',
      boxShadow: `${alpha('#74b8f0', 0.25)} 0 0 0 2.5px`,
    },
  },
}));

const AddStaffDialog = ({ handleClose }: PropsType) => {
  const [role, setRole] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  return (
    <>
      <DialogContent sx={{ margin: '20px 0', padding: '0 25px' }}>
        <FormControl>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-first-name" className="form__label">
                  First name
                </FormLabel>
                <StyledTextField
                  required
                  placeholder="First name"
                  id="input-first-name"
                  aria-labelledby="label-first-name"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-last-name" className="form__label">
                  Last name
                </FormLabel>
                <StyledTextField
                  required
                  placeholder="Last name"
                  id="input-last-name"
                  aria-labelledby="label-last-name"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-role" className="form__label">
                  Role
                </FormLabel>
                <Select value={role} onChange={handleChange} size="small" input={<StyledInput />}>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                </Select>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-gender" className="form__label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="label-gender"
                  defaultValue="male"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        sx={{
                          '&': {
                            color: '#c4cad1',
                            '&:hover': {
                              color: '#91979e',
                            },
                          },
                          '&.Mui-checked': {
                            color: '#0984e8',
                          },
                        }}
                        size="small"
                        disableRipple
                      />
                    }
                    label="Male"
                    sx={{ color: '#484c4f' }}
                  />
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        sx={{
                          '&': {
                            color: '#c4cad1',
                            '&:hover': {
                              color: '#91979e',
                            },
                          },
                          '&.Mui-checked': {
                            color: '#0984e8',
                          },
                        }}
                        size="small"
                        disableRipple
                      />
                    }
                    label="Female"
                    sx={{ color: '#484c4f' }}
                  />
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-phone-number" className="form__label">
                  Phone number
                </FormLabel>
                <StyledTextField
                  required
                  placeholder="Phone number"
                  id="input-phone-number"
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing="10px">
                <FormLabel id="label-email-address" className="form__label">
                  Email address
                </FormLabel>
                <StyledTextField
                  required
                  placeholder="Email address"
                  id="input-email-address"
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions className="dialog__actions">
        <Button variant="outlined" onClick={handleClose} className="btn btn-cancel">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} className="btn btn-add">
          Add
        </Button>
      </DialogActions>
    </>
  );
};

export default AddStaffDialog;
