'use client';

import { useState } from 'react';
import { stripePromise, PLANS } from '@/lib/stripe';

export function useStripe() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (planKey: 'plus' | 'premium') => {
    setLoading(true);
    
    try {
      const plan = PLANS[planKey];
      
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.priceId,
          successUrl: `${window.location.origin}/mypage?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      const { sessionId, url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Stripeのチェックアウトページにリダイレクト
      const stripe = await stripePromise;
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPortalSession = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Stripeのカスタマーポータルにリダイレクト
      window.location.href = url;

    } catch (error: any) {
      console.error('Portal error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createCheckoutSession,
    createPortalSession,
    plans: PLANS,
  };
} 