import { useScrollTop } from '@/hooks';
import React from 'react';

const NoInternet = () => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( Ingen internetanslutning.</h1>
      <p>Kontrollera din nätverksanslutning och försök igen.</p>
      <br />
      <button
        className="button"
        onClick={() => window.location.reload(true)}
        type="button"
      >
        Försök igen
      </button>
    </div>

  );
};

export default NoInternet;
