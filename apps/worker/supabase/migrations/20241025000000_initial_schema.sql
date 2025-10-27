-- Initial schema bootstrap for KBook
-- Generated from architecture/database-schema.md

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE org_sector AS ENUM ('ministry', 'clinic', 'school', 'other');
CREATE TYPE staff_role AS ENUM ('receptionist', 'admin', 'super_admin');
CREATE TYPE metadata_category AS ENUM ('reason', 'department', 'visitor_type', 'custom');
CREATE TYPE visit_status AS ENUM ('present', 'checked_out', 'backfill');
CREATE TYPE sync_status AS ENUM ('pending', 'synced', 'conflict');
CREATE TYPE telemetry_event_type AS ENUM ('sync_completed', 'sync_failed', 'offline_batch_saved', 'queue_length');

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sector org_sector NOT NULL,
  default_timezone text NOT NULL,
  data_retention_months smallint NOT NULL DEFAULT 12,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text NOT NULL,
  kiosk_mode boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_sites_org ON sites(organization_id);

CREATE TABLE staff_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id uuid REFERENCES sites(id) ON DELETE SET NULL,
  role staff_role NOT NULL,
  display_name text NOT NULL,
  pin_hash text,
  email citext,
  password_hash text,
  phone text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chk_staff_credentials CHECK (
    (role = 'receptionist' AND pin_hash IS NOT NULL)
    OR (role IN ('admin','super_admin') AND email IS NOT NULL AND password_hash IS NOT NULL)
  )
);

CREATE UNIQUE INDEX idx_staff_email_unique ON staff_users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_staff_org_role ON staff_users(organization_id, role);

CREATE TABLE device_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  device_label text NOT NULL,
  hardware_id text NOT NULL,
  last_seen_at timestamptz,
  status text NOT NULL DEFAULT 'active',
  UNIQUE (site_id, hardware_id)
);

CREATE TABLE visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  id_document text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_visitors_org_name ON visitors(organization_id, full_name);

CREATE TABLE visit_metadata_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  category metadata_category NOT NULL,
  label text NOT NULL,
  value text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order smallint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, category, value)
);

CREATE TABLE visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  visitor_id uuid NOT NULL REFERENCES visitors(id) ON DELETE RESTRICT,
  created_by_user_id uuid NOT NULL REFERENCES staff_users(id) ON DELETE RESTRICT,
  visitor_type_option_id uuid NOT NULL REFERENCES visit_metadata_options(id) ON DELETE RESTRICT,
  reason_option_id uuid NOT NULL REFERENCES visit_metadata_options(id) ON DELETE RESTRICT,
  department_option_id uuid REFERENCES visit_metadata_options(id) ON DELETE SET NULL,
  reason_other_text text,
  check_in_at timestamptz NOT NULL,
  check_out_at timestamptz,
  status visit_status NOT NULL DEFAULT 'present',
  sync_status sync_status NOT NULL DEFAULT 'synced',
  source_device_id uuid NOT NULL REFERENCES device_registrations(id) ON DELETE RESTRICT,
  offline_created_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  client_uuid uuid
);

CREATE UNIQUE INDEX idx_visits_org_client_uuid ON visits(organization_id, client_uuid) WHERE client_uuid IS NOT NULL;
CREATE INDEX idx_visits_site_status ON visits(site_id, status);
CREATE INDEX idx_visits_org_updated ON visits(organization_id, updated_at DESC);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  entity_type text NOT NULL,
  entity_id uuid,
  action text NOT NULL,
  performed_by_user_id uuid REFERENCES staff_users(id) ON DELETE SET NULL,
  source_device_id uuid REFERENCES device_registrations(id) ON DELETE SET NULL,
  request_id text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL,
  ingested_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_org_time ON audit_events(organization_id, occurred_at DESC);
CREATE INDEX idx_audit_entity ON audit_events(entity_type, entity_id);

CREATE TABLE telemetry_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  device_id uuid NOT NULL REFERENCES device_registrations(id) ON DELETE CASCADE,
  event_type telemetry_event_type NOT NULL,
  payload jsonb NOT NULL,
  recorded_at timestamptz NOT NULL,
  ingested_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_telemetry_site_type ON telemetry_events(site_id, event_type, recorded_at DESC);

CREATE TABLE training_acknowledgements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  staff_user_id uuid NOT NULL REFERENCES staff_users(id) ON DELETE CASCADE,
  module text NOT NULL,
  completed_at timestamptz NOT NULL,
  notes text,
  recorded_by uuid REFERENCES staff_users(id) ON DELETE SET NULL
);

CREATE INDEX idx_training_staff_module ON training_acknowledgements(staff_user_id, module);
