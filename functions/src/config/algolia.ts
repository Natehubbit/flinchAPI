import * as functions from 'firebase-functions'
import algoliasearch from 'algoliasearch'

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
export const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

export const ALGOLIA_INDEX_NAME = 'celebs';
export const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);