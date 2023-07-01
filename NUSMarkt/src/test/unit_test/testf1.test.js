import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';
import { auth } from './mockFirebase';
import Register from './Register';

test('calls login function and navigates on successful login', async () => {
  render(<Signup />);
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(loginButton);


  await screen.findByText('You have successfully signed in');
  expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
  expect(mockNavigate).toHaveBeenCalledWith('/BUY/');
});

test('displays error message on login failure', async () => {
  render(<MemoryRouter> <Signup /> </MemoryRouter>);
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');
  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(loginButton);


  await screen.findByText('You have keyed in wrong details');
  expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
});

test('calls register function and navigates on successful registration', async () => {
  render(<Register />);
  const registerButton = screen.getByRole('button', { name: 'Register Now' });

  const userInput = {
    firstName: 'Jerome',
    lastName: 'Goh',
    username: 'jeromegoh',
    email: 'test@example.com',
    password: 'password123',
    rePassword: 'password123',
    phoneNumber: '1234567890',
    telegramHandle: '@jaejayrome',
  };

  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: userInput.firstName } });
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: userInput.lastName } });
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: userInput.username } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: userInput.email } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: userInput.password } });
  fireEvent.change(screen.getByLabelText('Re-Enter Password'), { target: { value: userInput.rePassword } });
  fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: userInput.phoneNumber } });
  fireEvent.change(screen.getByLabelText('Telegram Handle'), { target: { value: userInput.telegramHandle } });
  fireEvent.click(registerButton);


  await screen.findByText('You have successfully signed up');
  expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(userInput.email, userInput.password);
  expect(mockNavigate).toHaveBeenCalledWith('/BUY');
});

test('displays error message on registration failure', async () => {
  render(<MemoryRouter> <Register /> </MemoryRouter>);
  const registerButton = screen.getByRole('button', { name: 'Register Now' });

  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Re-Enter Password'), { target: { value: 'differentpassword' } });
  fireEvent.click(registerButton);

  await screen.findByText('You have not completed the required fields!');
  expect(auth.createUserWithEmailAndPassword).not.toHaveBeenCalled();
});





