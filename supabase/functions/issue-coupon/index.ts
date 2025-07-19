import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('stardust, coupon_issued')
      .eq('id', user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    // Check if user is eligible for coupon
    if (profile.stardust >= 10 && !profile.coupon_issued) {
      // Generate coupon code
      const couponCode = `STARDUST_${Date.now().toString(36).toUpperCase()}`
      
      // Update profile to mark coupon as issued
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ coupon_issued: true })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      // Here you would typically integrate with Stripe to create a promotion code
      // For now, we'll just return the coupon code
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Coupon issued successfully',
          couponCode,
          stardust: profile.stardust
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Not eligible for coupon',
          stardust: profile.stardust,
          couponIssued: profile.coupon_issued
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
}) 