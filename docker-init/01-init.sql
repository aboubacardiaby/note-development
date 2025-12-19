-- Ensure noteuser owns the public schema
ALTER SCHEMA public OWNER TO noteuser;

-- Grant all privileges on schema
GRANT ALL ON SCHEMA public TO noteuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO noteuser;

-- Grant privileges on all tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO noteuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO noteuser;

-- Set default privileges for future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO noteuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO noteuser;
