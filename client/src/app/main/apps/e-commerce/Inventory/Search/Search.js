import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'buY0TaxJpRK3t1M0nOJ3xdutx7PJKI8U', // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: 'ajvgxthp3l9bry5up-1.a1.typesense.net',
        port: '443',
        protocol: 'https'
      }
    ]
  },
  cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: 'firstName,lastName,gender'
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Search = () => (
  <InstantSearch indexName="customers" searchClient={searchClient}>
    <SearchBox translations={{ placeholder: 'Search for Customers' }} />
    <Hits
      hitComponent={(hit) => {
        console.log(hit);
      }}
    />
  </InstantSearch>
);

export default Search;
