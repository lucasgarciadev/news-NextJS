import Head from 'next/head';
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

import { SubscribeButton } from '../components/SubscribeButton';

//Client-Side Render
//Server-Side Render
//Static Site Generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
  
}

export default function Home({ product }: HomeProps) {

  console.log(product);

  return (
    <>
      <Head>
          <title>Home | Ig News</title>
      </Head>

      <main className={styles.contentContainer} >
        <section className={styles.hero} >
          <span>👏 Hey, Welcome</span>
          <h1>News about <br/> the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="images/avatar.svg" />
      </main>
    </>
  )
}

export const getStaticProps : GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1K08zUAe8eQIZQvRjDUk7T2r', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props : {
      product
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}
