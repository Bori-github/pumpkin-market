import type { NextPage } from 'next';
import { useState } from 'react';
import TwitterIcon from '../assets/twitter.svg';
import GithubIcon from '../assets/github.svg';

const Enter: NextPage = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  return (
    <section>
      <h3>Enter to Pumpkin</h3>
      <div>
        <button type="button" onClick={() => setMethod('email')}>
          Email
        </button>
        <button type="button" onClick={() => setMethod('phone')}>
          Phone
        </button>
      </div>
      <form>
        <label htmlFor={method === 'email' ? 'email' : 'phone'}>
          {method === 'email' ? 'Email address' : 'Phone number'}
        </label>
        {method === 'email' && <input type="email" required />}
        {method === 'phone' && <input type="number" required />}
        <button type="submit">
          {method === 'email' ? 'Get login link' : 'Get one-time password'}
        </button>
      </form>
      <div>
        <p>Or enter with</p>
        <div>
          <button>
            <TwitterIcon width="20px" />
          </button>
          <button>
            <GithubIcon width="20px" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Enter;
