import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Invalid signature', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === 'checkout.session.completed') {
    if (!userId || !courseId) {
      return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        }
      });
    } catch (err) {
      console.error('Database error:', err);
      return new NextResponse('Webhook Error: Database error', { status: 500 });
    }
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}
