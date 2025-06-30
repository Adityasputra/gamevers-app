/**
 * MongoDB collection name for storing user data.
 */
export const COLLECTION_USER = "users";

/**
 * MongoDB collection name for storing product data.
 */
export const COLLECTION_PRODUCT = "products";

/**
 * MongoDB collection name for storing user wishlists.
 */
export const COLLECTION_WISHLIST = "wishlist";

/**
 * MongoDB collection name for storing reset tokens.
 * Used for password reset functionality.
 */
export const COLLECTION_RESET_TOKEN = "reset_tokens";

/**
 * MongoDB database name, required to be set in the .env file as NEXT_PUBLIC_DATABASE_NAME.
 * Throws an error if the environment variable is not defined.
 */
export const DATABASE_NAME: string = (() => {
  const name = process.env.NEXT_PUBLIC_DATABASE_NAME;
  if (!name) {
    throw new Error(
      "Environment variable NEXT_PUBLIC_DATABASE_NAME must be defined."
    );
  }
  return name;
})();

/**
 * Base URL of the application, used for server-side requests.
 * Must be defined in the .env file as NEXT_PUBLIC_BASE_URL.
 * Throws an error if the environment variable is not defined.
 */
export const BASE_URL: string = (() => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) {
    throw new Error(
      "Environment variable NEXT_PUBLIC_BASE_URL must be defined."
    );
  }
  return url;
})();
