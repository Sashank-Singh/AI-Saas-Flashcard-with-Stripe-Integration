"use client"; // Ensure this is a Client Component

import React from "react";
import getStripe from "@/utils/get-stripe";
import { SignIn, SignOut, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Container, Button, Box, Grid, Card, CardContent } from '@mui/material';
import Head from "next/head";

export default function Home() {

  const handleCheckout = async (priceId) => {
    const stripe = await getStripe();
    const response = await fetch('/api/generate/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost:3000', // or your actual origin if different
      },
      body: JSON.stringify({ priceId }),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Stripe checkout failed:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create and study flashcards" />
      </Head>
      
      {/* AppBar with SignIn/SignOut Options */}
      <AppBar position="static" sx={{ mb: 4, py: 2, boxShadow: 2 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>Flashcard SaaS</Typography>

          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button variant="contained" color="secondary" href="/sign-up">Sign Up</Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <Button color="inherit" sx={{ ml: 2 }} href="/sign-out">Sign Out</Button>
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: "center", my: 6 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" size="large" href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" size="large" sx={{ ml: 2 }}>
          Learn More
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: "center" }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Easy Text Input
                </Typography>
                <Typography variant="body1">
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Smart Flashcards
                </Typography>
                <Typography variant="body1">
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Accessible Anywhere
                </Typography>
                <Typography variant="body1">
                  Access your flashcards on any device, anytime, anywhere, and never miss a study session.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>Pricing</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                  Basic Plan
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  $5 / month
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  - Access to basic flashcard features <br />
                  - Limited storage <br />
                  - Community support
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  onClick={() => handleCheckout('price_basic')}
                >
                  Choose Basic
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, border: 2, borderColor: 'secondary.main' }}>
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                  Pro Plan
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  $9.99 / month
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  - Unlimited flashcards <br />
                  - Advanced AI features <br />
                  - Priority support
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ mt: 3 }}
                  onClick={() => handleCheckout('price_pro')}
                >
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                  Enterprise Plan
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Custom Pricing
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  - Tailored solutions <br />
                  - Dedicated AI model <br />
                  - 24/7 support
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  onClick={() => handleCheckout('price_enterprise')}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
