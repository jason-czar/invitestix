import { createClient } from '@base44/sdk';

// Create a client without authentication requirement
export const base44 = createClient({
  appId: "684331da2a977d05d814603d", 
  requiresAuth: false // Remove authentication requirement
});
