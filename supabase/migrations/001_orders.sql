-- Orders table
create table if not exists orders (
  id                      uuid primary key,
  stripe_session_id       text not null,
  stripe_payment_intent_id text,
  status                  text not null default 'pending'
                            check (status in ('pending','paid','processing','shipped','delivered','cancelled')),
  customer_name           text not null,
  customer_email          text not null,
  customer_phone          text,
  total                   integer not null,
  currency                text not null default 'gbp',
  tracking_carrier        text,
  tracking_number         text,
  tracking_url            text,
  notes                   text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- Order items table
create table if not exists order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  product_id   text not null,
  product_name text not null,
  quantity     integer not null,
  unit_price   integer not null,
  image_url    text
);

-- Auto-update updated_at on orders
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- RLS
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public can read a single order by its UUID (the UUID is the access token)
create policy "read own order" on orders
  for select using (true);

create policy "read own order items" on order_items
  for select using (true);

-- Service role bypasses RLS for webhook writes — no additional policy needed
