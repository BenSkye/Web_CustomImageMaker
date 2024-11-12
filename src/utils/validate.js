export const validatePassword = (val) => {
  const errors = [];

  if (val === null) {
    val = ''
  }
  
  if (val.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (val.length > 12) {
    errors.push('Password cannot exceed 12 characters');
  }

  if (!/[A-Z]/.test(val)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(val)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(val)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[_#?!@$%^&*-]/.test(val)) {
    errors.push('Password must contain at least one special character (_, #, ?, !, @, $, %, ^, &, *, -)');
  }

  return errors;
}

export const validateEmail = (val) => {
  const errors = [];

  if (val === null) {
    val = ''
  }

  if(val.length === 0) {
    errors.push('Email cannot emtpy!')
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    errors.push('Email must be a valid email address');
  }
  
  return errors;
}