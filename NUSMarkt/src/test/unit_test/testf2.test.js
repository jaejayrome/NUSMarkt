import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sell_Analytics from './Sell_Analytics';

test('successfully generates designs on form submission', async () => {
  render(<Sell_Analytics />);
  
  const logoInput = screen.getByLabelText('Enter here');
  const colorInput = screen.getByLabelText('Enter here');
  const submitButton = screen.getByRole('button', { name: 'Generate Designs!' });

  const userInput = {
    logo: 'LogoName',
    color: 'Blue',
  };


  fireEvent.change(logoInput, { target: { value: userInput.logo } });
  fireEvent.change(colorInput, { target: { value: userInput.color } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
      },
      body: JSON.stringify({
        prompt: `tee shirt with ${userInput.logo} in ${userInput.color}`,
        n: 3,
        size: '256x256',
      }),
    });
  });

 
  expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.queryByAltText('Thumbnail')).toBeInTheDocument();
});

test('displays loading state during API request', async () => {
  render(<Sell_Analytics />);
  
  const submitButton = screen.getByRole('button', { name: 'Generate Designs!' });
  const userInput = {
    logo: 'LogoName',
    color: 'Blue',
  };


  fireEvent.change(screen.getByLabelText('Enter here'), { target: { value: userInput.logo } });
  fireEvent.change(screen.getByLabelText('Enter here'), { target: { value: userInput.color } });
  fireEvent.click(submitButton);


  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
