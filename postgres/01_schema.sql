begin;
  create table pizza (
    pizza_id smallserial primary key,
    name text not null,
    toppings text[],
    crust text not null,
    sauce text not null,
    size text not null
  );

  create table pizza_order (
    order_id smallserial primary key,
    toppings text[] not null,
    crust text not null,
    sauce text not null,
    size text not null
  );

  insert into pizza (name, toppings, crust, sauce, size) values
    ('quattro formaggi', '{"mozzarella", "parmesan", "ricotta", "gorgonzola"}', 'regular', 'olive oil', 'large'),
    ('pepperoni', '{"pepperoni", "mozzarella", "parmesan"}', 'thin', 'marinara', 'medium'),
    ('hawaiian', '{"pineapple", "canadian bacon", "mozzarella"}', 'gluten-free', 'marinara', 'small'),
    ('chicken alfredo', '{"grilled chicken", "mozzarella", "parmesan", "roasted garlic"}', 'regular', 'alfredo', 'large'),
    ('veggie supreme', '{"black olives", "mushrooms", "green peppers", "red onions", "mozzarella"}', 'thin', 'marinara', 'small'),
    ('fig and pig', '{"prosciutto", "mozzarella", "parmesan", "arugula"}', 'regular', 'fig jam', 'medium'),
    ('carnivore', '{"mozzarella", "italian sausage", "pepperoni", "prosciutto", "canadian bacon"}', 'gluten-free', 'marinara', 'large');
commit;
