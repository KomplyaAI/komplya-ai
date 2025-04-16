create extension if not exists "uuid-ossp";

create extension if not exists vector;

create table Calls (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp default now(),
  caller_name text,
  agent_name text,
  transcript text
);

create table ComplianceRules (
  id uuid primary key default uuid_generate_v4(),
  rule_text text not null,
  category text,
  severity text
);

create table Results (
  id uuid primary key default uuid_generate_v4(),
  call_id uuid references Calls(id) on delete cascade,
  compliance_score int,
  overall_assessment text
);

create table Violations (
  id uuid primary key default uuid_generate_v4(),
  call_id uuid references Calls(id) on delete cascade,
  rule_id uuid references ComplianceRules(id),
  description text,
  timestamp text
);

create table CoachingFeedback (
  id uuid primary key default uuid_generate_v4(),
  call_id uuid references Calls(id) on delete cascade,
  advice text
);

create table AuditLog (
  id uuid primary key default uuid_generate_v4(),
  call_id uuid references Calls(id) on delete cascade,
  analysis_type text,
  content text,
  created_at timestamp default now()
);
