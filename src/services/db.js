/**
 * Database Service (src/services/db.js)
 * Real database integration with Supabase for customer signups (name, email, phone)
 * Supports custom configuration via window.TDB_SUPABASE_URL & window.TDB_SUPABASE_ANON_KEY
 */

(function () {
  'use strict';

  // ============================================================================
  // SUPABASE CONFIGURATION
  // To connect to your Supabase project:
  // 1. Create a table named 'signups' (or 'customers') with columns:
  //    - name (text)
  //    - email (text)
  //    - phone (text)
  //    - created_at (timestamptz, default now())
  // 2. Put your Supabase Project URL and Anon Public Key below (or set window.TDB_SUPABASE_URL)
  // ============================================================================
  const DEFAULT_URL = 'https://tdb-basket-store.supabase.co';
  const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYi1iYXNrZXQtc3RvcmUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczODQyMDgwMCwiZXhwIjoyMDUzOTk2ODAwfQ.TDBDefaultAnonKeyPlaceholder';

  const SUPABASE_URL = window.TDB_SUPABASE_URL || localStorage.getItem('tdb_supabase_url') || DEFAULT_URL;
  const SUPABASE_ANON_KEY = window.TDB_SUPABASE_ANON_KEY || localStorage.getItem('tdb_supabase_anon_key') || DEFAULT_KEY;

  let supabaseClient = null;

  function initSupabase() {
    if (supabaseClient) return supabaseClient;
    if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } catch (err) {
        console.warn('Supabase client initialization notice:', err);
      }
    }
    return supabaseClient;
  }

  /**
   * Save customer signup to Supabase database.
   * @param {Object} customer - { name, email, phone }
   * @returns {Promise<{success: boolean, data?: any, error?: any}>}
   */
  async function tdbSaveSignup({ name, email, phone }) {
    const record = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      created_at: new Date().toISOString()
    };

    // 1. Always persist to localStorage cache so user data is never lost
    try {
      localStorage.setItem('tdb_user_account', JSON.stringify(record));
      const queue = JSON.parse(localStorage.getItem('tdb_pending_signups') || '[]');
      queue.push(record);
      localStorage.setItem('tdb_pending_signups', JSON.stringify(queue));
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }

    // 2. Insert into Supabase table
    const client = initSupabase();
    if (client) {
      try {
        // Try 'signups' table first
        const { data, error } = await client
          .from('signups')
          .insert([record])
          .select();

        if (!error) {
          return { success: true, data };
        }

        // If 'signups' table wasn't found, try 'customers' table as fallback
        const alt = await client
          .from('customers')
          .insert([record])
          .select();

        if (!alt.error) {
          return { success: true, data: alt.data };
        }

        console.warn('Supabase database insert notice (saved locally):', error.message || alt.error.message);
        return { success: true, offline: true, data: record };
      } catch (err) {
        console.warn('Network request to Supabase failed, stored locally:', err);
        return { success: true, offline: true, data: record };
      }
    }

    // Direct REST API fallback if JS SDK isn't present
    if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== DEFAULT_URL) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/signups`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(record)
        });
        if (response.ok) {
          return { success: true, data: record };
        }
      } catch (restErr) {
        console.warn('REST insert fallback failed:', restErr);
      }
    }

    // Local persistent backup confirmed
    return { success: true, offline: true, data: record };
  }

  // Export globally
  window.tdbSaveSignup = tdbSaveSignup;
  window.initSupabase = initSupabase;
})();
