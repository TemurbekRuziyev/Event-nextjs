import React, { useState } from 'react';
import { useRouter } from 'next/router';
const Search = () => {
  const { push, pathname, query } = useRouter();
  const [term, setTerm] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push({
      pathname,
      query: { ...query, term: term }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={term} onChange={event => setTerm(event.target.value)} />
    </form>
  );
};

export default Search;
