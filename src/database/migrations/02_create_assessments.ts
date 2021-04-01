import * as Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('assessments', table => {
    table.increments('id').primary();
    table.string('assessment').notNullable()
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('assessments')
}