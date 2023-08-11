// npm install @stripe/stripe-js
import { Button, SxProps, Theme } from '@mui/material';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as StripeLogo } from '../../../public/stripe.svg';

interface IStripeButtonProps {
  sx: SxProps<Theme>;
}

const StripeButton: FC<IStripeButtonProps> = ({ sx }) => {
  const [stripeError, setStripeError] = useState<string | undefined | null>(
    null
  );
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      if (!stripe) {
        const stripeTmp = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

        setStripe(stripeTmp);
      }
    };

    onLoad();
  });

  const handleClick = () => {
    setStripeError(null);

    window.location.replace(
      'https://donate.stripe.com/test_bIY29caKg7o0aWYbII'
    );

    // stripe
    //   ?.redirectToCheckout({
    //     mode: 'payment',
    //     successUrl: 'http://localhost:5173/home',
    //     cancelUrl: 'https://myweb.com/canceled',
    //   })
    //   .then(function (result) {
    //     if (result.error) {
    //       setStripeError(result.error.message);
    //     }
    //   });
  };

  return (
    <>
      {stripe ? (
        <Button sx={{ marginBottom: '10px', ...sx }} onClick={handleClick}>
          <StripeLogo
            width={48}
            height={24}
            style={{ marginTop: '15px' }}
          ></StripeLogo>
        </Button>
      ) : (
        'Loading...'
      )}
      {stripeError ? <div id="error-message">{stripeError}</div> : null}
    </>
  );
};

export default StripeButton;
