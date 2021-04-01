import * as Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('points', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('email').nullable()
    table.string('whatsapp').nullable()
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('points')
}